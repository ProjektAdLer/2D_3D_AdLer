/**
 * MBZ Extractor Module for Electron
 *
 * Extrahiert MBZ-Dateien (Moodle Backup) in den userData/LearningWorlds Ordner.
 * Wiederverwendet die Logik aus scripts/extractLearningWorlds.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const AdmZip = require("adm-zip");
const xml2js = require("xml2js");

/**
 * Erstellt Verzeichnisse falls nicht vorhanden
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Löscht ein Verzeichnis rekursiv
 */
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

/**
 * Entpackt eine tar.gz Datei (MBZ)
 */
function extractMBZ(mbzPath, targetDir) {
  ensureDir(targetDir);

  try {
    execSync(`tar -xzf "${mbzPath}" -C "${targetDir}"`, {
      stdio: "pipe",
    });
  } catch (error) {
    if (
      !error.message.includes("empty or unreadable filename") &&
      !error.message.includes("Error exit delayed")
    ) {
      throw new Error(`MBZ Extraction failed: ${error.message}`);
    }
  }

  const atfPath = path.join(targetDir, "ATF_Document.json");
  const dslPath = path.join(targetDir, "DSL_Document.json");

  if (!fs.existsSync(atfPath) && !fs.existsSync(dslPath)) {
    throw new Error("Neither ATF_Document.json nor DSL_Document.json found");
  }

  return true;
}

/**
 * Entpackt eine H5P-Datei (ist auch ein ZIP)
 */
function extractH5P(h5pPath, targetDir) {
  ensureDir(targetDir);

  try {
    const zip = new AdmZip(h5pPath);
    zip.extractAllTo(targetDir, true);
    return true;
  } catch (error) {
    console.warn(`H5P extraction failed: ${error.message}`);
    return false;
  }
}

/**
 * Kopiert eine Datei
 */
function copyFile(source, target) {
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
}

/**
 * Sucht eine Datei im Verzeichnis (case-insensitive, mit Unicode-Normalisierung)
 */
function findFile(dir, fileName) {
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir);
  const normalizedSearch = fileName.normalize("NFC").toLowerCase();

  const found = files.find((f) => {
    const normalizedFile = f.normalize("NFC").toLowerCase();
    return normalizedFile === normalizedSearch;
  });

  return found ? path.join(dir, found) : null;
}

/**
 * Erstellt ein Mapping von ElementUUID zu Dateipfad aus files.xml (für DSL-Format)
 */
async function buildFileMapping(tempDir) {
  const filesXmlPath = path.join(tempDir, "files.xml");

  if (!fs.existsSync(filesXmlPath)) {
    return null;
  }

  try {
    const xmlContent = fs.readFileSync(filesXmlPath, "utf-8");
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlContent);

    const mapping = new Map();

    if (result.files && result.files.file) {
      result.files.file.forEach((file) => {
        const elementUUID = file.elementUUID?.[0];
        const contenthash = file.contenthash?.[0];
        const source = file.source?.[0];

        if (elementUUID && contenthash && source) {
          const hashPrefix = contenthash.substring(0, 2);
          const filePath = path.join(tempDir, "files", hashPrefix, contenthash);

          mapping.set(elementUUID, {
            path: filePath,
            originalName: source,
          });
        }
      });
    }

    return mapping;
  } catch (error) {
    console.warn(`files.xml parsing failed: ${error.message}`);
    return null;
  }
}

/**
 * Verarbeitet ein einzelnes Lernelement
 */
function processElement(element, tempDir, elementsDir, fileMapping = null) {
  const elementId = element.elementId;
  const elementName = element.elementName;
  const elementType = element.elementFileType;
  const category = element.elementCategory;
  const elementUUID = element.elementUUID;

  // Externe URLs überspringen
  if (element.url && element.url.startsWith("http")) {
    return true;
  }

  // Adaptivitätselemente haben keine separate Datei
  if (category === "adaptivity" || elementType === "adaptivity") {
    return true;
  }

  // Quelldatei finden
  let sourceFile = null;

  // DSL-Format: Verwende fileMapping
  if (fileMapping && elementUUID) {
    const fileInfo = fileMapping.get(elementUUID);
    if (fileInfo) {
      sourceFile = fileInfo.path;
    }
  }

  // ATF-Format oder Fallback: Suche nach Dateiname
  if (!sourceFile) {
    const sourceFileName = `${elementName}.${elementType}`;
    sourceFile = findFile(tempDir, sourceFileName);
  }

  if (!sourceFile) {
    console.warn(`File not found for element ${elementId}: ${elementName}`);
    return false;
  }

  // H5P-Elemente (sind ZIP-Archive)
  if (
    category === "h5p" ||
    category === "primitiveH5P" ||
    elementType === "h5p"
  ) {
    const h5pTargetDir = path.join(elementsDir, String(elementId));

    if (extractH5P(sourceFile, h5pTargetDir)) {
      return true;
    } else {
      // Fallback: Als Datei kopieren
      const targetFile = path.join(elementsDir, `${elementId}.${elementType}`);
      copyFile(sourceFile, targetFile);
      return true;
    }
  }

  // Normale Dateien
  const targetFile = path.join(elementsDir, `${elementId}.${elementType}`);
  copyFile(sourceFile, targetFile);

  return true;
}

/**
 * Verarbeitet eine MBZ-Datei und extrahiert sie in den userData Ordner
 *
 * @param {string} mbzPath - Pfad zur MBZ-Datei
 * @param {string} targetBasePath - Basis-Pfad für LearningWorlds (z.B. userData/LearningWorlds)
 * @param {Function} progressCallback - Callback für Fortschritts-Updates (optional)
 * @returns {Promise<Object>} World info object
 */
async function extractMBZToUserData(
  mbzPath,
  targetBasePath,
  progressCallback = null,
) {
  const mbzFileName = path.basename(mbzPath, ".mbz");
  const tempDir = path.join(targetBasePath, ".temp", mbzFileName);

  const updateProgress = (message, progress) => {
    if (progressCallback) {
      progressCallback({ message, progress });
    }
  };

  try {
    // 1. Entpacke MBZ
    updateProgress("Entpacke MBZ-Datei...", 10);
    removeDir(tempDir);
    extractMBZ(mbzPath, tempDir);

    // 2. Lese Metadaten
    updateProgress("Lese Lernwelt-Metadaten...", 20);
    const atfPath = path.join(tempDir, "ATF_Document.json");
    const dslPath = path.join(tempDir, "DSL_Document.json");

    let documentPath = fs.existsSync(atfPath) ? atfPath : dslPath;
    const worldData = JSON.parse(fs.readFileSync(documentPath, "utf-8"));
    const worldName = worldData.world.worldName;

    // Zielverzeichnis
    const worldDir = path.join(targetBasePath, worldName);
    const elementsDir = path.join(worldDir, "elements");
    ensureDir(elementsDir);

    // 3. File-Mapping
    updateProgress("Erstelle File-Mapping...", 30);
    const fileMapping = await buildFileMapping(tempDir);

    // 4. Verarbeite Elemente
    updateProgress("Verarbeite Lernelemente...", 40);
    let successCount = 0;
    const totalElements = worldData.world.elements.length;

    worldData.world.elements.forEach((element, index) => {
      if (processElement(element, tempDir, elementsDir, fileMapping)) {
        successCount++;
      }

      const elementProgress = 40 + Math.floor((index / totalElements) * 40);
      updateProgress(
        `Verarbeite Element ${index + 1}/${totalElements}...`,
        elementProgress,
      );
    });

    // 5. Speichere world.json
    updateProgress("Speichere world.json...", 85);
    const worldJsonPath = path.join(worldDir, "world.json");

    if (worldData.$type === "ATF" || worldData.$type === "DSL") {
      worldData.$type = "AWT";
    }

    fs.writeFileSync(
      worldJsonPath,
      JSON.stringify(worldData, null, 2),
      "utf-8",
    );

    // 6. Aktualisiere worlds.json
    updateProgress("Aktualisiere Weltenliste...", 90);
    await updateWorldsIndex(targetBasePath, {
      worldName,
      worldDescription: worldData.world.worldDescription || "",
      elementCount: successCount,
    });

    // 7. Aufräumen
    updateProgress("Räume auf...", 95);
    removeDir(tempDir);

    updateProgress("Fertig!", 100);

    return {
      success: true,
      worldName,
      worldDescription: worldData.world.worldDescription || "",
      elementCount: successCount,
    };
  } catch (error) {
    // Aufräumen bei Fehler
    removeDir(tempDir);
    throw error;
  }
}

/**
 * Aktualisiert die worlds.json Index-Datei
 */
async function updateWorldsIndex(targetBasePath, newWorld) {
  const worldsJsonPath = path.join(targetBasePath, "worlds.json");

  let worldsIndex = { worlds: [] };

  if (fs.existsSync(worldsJsonPath)) {
    worldsIndex = JSON.parse(fs.readFileSync(worldsJsonPath, "utf-8"));
  }

  const existingIndex = worldsIndex.worlds.findIndex(
    (w) => w.worldName === newWorld.worldName,
  );

  const worldEntry = {
    worldID:
      existingIndex >= 0
        ? worldsIndex.worlds[existingIndex].worldID
        : worldsIndex.worlds.length + 1,
    worldName: newWorld.worldName,
    worldFolder: newWorld.worldName,
    description: newWorld.worldDescription,
    elementCount: newWorld.elementCount,
  };

  if (existingIndex >= 0) {
    worldsIndex.worlds[existingIndex] = worldEntry;
  } else {
    worldsIndex.worlds.push(worldEntry);
  }

  fs.writeFileSync(
    worldsJsonPath,
    JSON.stringify(worldsIndex, null, 2),
    "utf-8",
  );

  return worldsIndex;
}

/**
 * Listet alle installierten Lernwelten auf
 */
function listInstalledWorlds(targetBasePath) {
  const worldsJsonPath = path.join(targetBasePath, "worlds.json");

  if (!fs.existsSync(worldsJsonPath)) {
    return [];
  }

  const worldsIndex = JSON.parse(fs.readFileSync(worldsJsonPath, "utf-8"));

  // Füge Größeninformationen hinzu
  return worldsIndex.worlds.map((world) => {
    const worldDir = path.join(targetBasePath, world.worldFolder);
    let sizeInBytes = 0;

    try {
      sizeInBytes = getFolderSize(worldDir);
    } catch (error) {
      console.warn(`Could not calculate size for ${world.worldName}`);
    }

    return {
      ...world,
      sizeInBytes,
      sizeFormatted: formatBytes(sizeInBytes),
    };
  });
}

/**
 * Löscht eine installierte Lernwelt
 */
async function deleteWorld(targetBasePath, worldName) {
  const worldDir = path.join(targetBasePath, worldName);
  const worldsJsonPath = path.join(targetBasePath, "worlds.json");

  // Lösche Ordner
  if (fs.existsSync(worldDir)) {
    removeDir(worldDir);
  }

  // Aktualisiere worlds.json
  if (fs.existsSync(worldsJsonPath)) {
    const worldsIndex = JSON.parse(fs.readFileSync(worldsJsonPath, "utf-8"));
    worldsIndex.worlds = worldsIndex.worlds.filter(
      (w) => w.worldName !== worldName,
    );
    fs.writeFileSync(
      worldsJsonPath,
      JSON.stringify(worldsIndex, null, 2),
      "utf-8",
    );
  }

  return { success: true, worldName };
}

/**
 * Berechnet die Größe eines Ordners rekursiv
 */
function getFolderSize(dirPath) {
  let size = 0;

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      size += getFolderSize(filePath);
    } else {
      size += stats.size;
    }
  }

  return size;
}

/**
 * Formatiert Bytes in lesbare Größe
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

module.exports = {
  extractMBZToUserData,
  listInstalledWorlds,
  deleteWorld,
};
