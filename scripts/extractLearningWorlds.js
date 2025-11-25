#!/usr/bin/env node

/**
 * AdLer Learning World Extractor
 *
 * Entpackt MBZ-Dateien (Moodle Backup) und bereitet sie für den FileBasedBackendAdapter vor.
 *
 * Usage:
 *   node scripts/extractLearningWorlds.js [path/to/file.mbz]
 *   node scripts/extractLearningWorlds.js                      # Verarbeitet alle MBZ im LearningWorlds Ordner
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const AdmZip = require("adm-zip");
const xml2js = require("xml2js");

// Konfiguration
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const MBZ_INPUT_DIR = path.join(PUBLIC_DIR, "MBZ");
const LEARNING_WORLDS_DIR = path.join(PUBLIC_DIR, "LearningWorlds");
const TEMP_DIR = path.join(LEARNING_WORLDS_DIR, ".temp");

// Farben für Console Output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

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
    // Ignoriere tar Warnungen über leere Dateinamen (kommt bei manchen MBZ vor)
    // Auf Windows wird tar.exe (ab Windows 10 1803+) verwendet
    execSync(`tar -xzf "${mbzPath}" -C "${targetDir}"`, {
      stdio: "pipe", // Unterdrücke Warnungen
    });
  } catch (error) {
    // tar gibt oft einen Fehlercode zurück wegen leerer Dateinamen im MBZ,
    // aber die wichtigen Dateien werden trotzdem extrahiert.
    // Prüfe daher, ob ATF_Document.json vorhanden ist, bevor wir aufgeben.
    if (
      !error.message.includes("empty or unreadable filename") &&
      !error.message.includes("Error exit delayed")
    ) {
      log(
        `✗ Fehler beim Entpacken von ${path.basename(mbzPath)}: ${error.message}`,
        "red",
      );
      return false;
    }
    // Ignoriere den Fehler und prüfe stattdessen, ob die Datei da ist
  }

  // Prüfe ob ATF_Document.json oder DSL_Document.json vorhanden ist
  const atfPath = path.join(targetDir, "ATF_Document.json");
  const dslPath = path.join(targetDir, "DSL_Document.json");

  if (fs.existsSync(atfPath) || fs.existsSync(dslPath)) {
    return true;
  } else {
    log(
      `✗ Weder ATF_Document.json noch DSL_Document.json im Archiv gefunden`,
      "red",
    );
    return false;
  }
}

/**
 * Entpackt eine H5P-Datei (ist auch ein ZIP)
 * Verwendet adm-zip für plattformunabhängiges Entpacken
 */
function extractH5P(h5pPath, targetDir) {
  ensureDir(targetDir);

  try {
    const zip = new AdmZip(h5pPath);
    zip.extractAllTo(targetDir, /* overwrite */ true);
    return true;
  } catch (error) {
    log(
      `  ⚠ Warnung: H5P konnte nicht entpackt werden: ${error.message}`,
      "yellow",
    );
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

  // Normalisiere den Suchbegriff (NFC für Windows-Kompatibilität)
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
    return null; // Kein files.xml = ATF-Format
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
          // Datei ist in files/XX/XXXXXX... gespeichert (XX = erste 2 Zeichen)
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
    log(
      `  ⚠ Warnung: files.xml konnte nicht gelesen werden: ${error.message}`,
      "yellow",
    );
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
    log(`  ✓ Element ${elementId} (${elementName}): Externe URL`, "cyan");
    return true;
  }

  // Adaptivitätselemente haben keine separate Datei - Inhalt ist in world.json
  if (category === "adaptivity" || elementType === "adaptivity") {
    log(
      `  ✓ Element ${elementId} (${elementName}): Adaptivität (eingebettet in world.json)`,
      "cyan",
    );
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
    const sourceFileName = `${elementName}.${elementType}`;
    log(`  ⚠ Warnung: Datei nicht gefunden: ${sourceFileName}`, "yellow");

    // Debug: Zeige ähnliche Dateien zur Fehlersuche
    if (fs.existsSync(tempDir)) {
      const files = fs.readdirSync(tempDir);
      const similarFiles = files.filter(
        (f) =>
          f.includes(
            elementName.substring(0, Math.min(5, elementName.length)),
          ) || f.endsWith(`.${elementType}`),
      );
      if (similarFiles.length > 0) {
        log(
          `    Ähnliche Dateien gefunden: ${similarFiles.slice(0, 3).join(", ")}`,
          "yellow",
        );
      }
    }
    return false;
  }

  // H5P-Elemente (sind ZIP-Archive)
  if (
    category === "h5p" ||
    category === "primitiveH5P" ||
    elementType === "h5p"
  ) {
    const h5pTargetDir = path.join(elementsDir, String(elementId));
    const displayName = `${elementName}.${elementType}`;

    log(`  → Entpacke H5P: ${displayName} → elements/${elementId}/`, "blue");

    if (extractH5P(sourceFile, h5pTargetDir)) {
      log(`  ✓ Element ${elementId} (${elementName}): H5P entpackt`, "green");
      return true;
    } else {
      // Fallback: Als Datei kopieren falls Entpacken fehlschlägt
      const targetFile = path.join(elementsDir, `${elementId}.${elementType}`);
      copyFile(sourceFile, targetFile);
      log(
        `  ✓ Element ${elementId} (${elementName}): Als Datei kopiert`,
        "green",
      );
      return true;
    }
  }

  // Normale Dateien (Bilder, PDFs, Videos, etc.)
  const targetFile = path.join(elementsDir, `${elementId}.${elementType}`);
  copyFile(sourceFile, targetFile);
  log(`  ✓ Element ${elementId} (${elementName}): ${elementType}`, "green");

  return true;
}

/**
 * Prüft ob eine Welt bereits entpackt wurde
 */
function isWorldAlreadyExtracted(worldName) {
  const worldDir = path.join(LEARNING_WORLDS_DIR, worldName);
  const worldJsonPath = path.join(worldDir, "world.json");
  return fs.existsSync(worldJsonPath);
}

/**
 * Verarbeitet eine MBZ-Datei
 */
async function processMBZ(mbzPath, skipExisting = true) {
  const mbzFileName = path.basename(mbzPath, ".mbz");
  log(`\n${"=".repeat(60)}`, "cyan");
  log(`Verarbeite: ${mbzFileName}.mbz`, "cyan");
  log("=".repeat(60), "cyan");

  // Temporäres Verzeichnis für Entpacken
  const tempExtractDir = path.join(TEMP_DIR, mbzFileName);
  removeDir(tempExtractDir);

  // MBZ entpacken
  log("\n1. Entpacke MBZ...", "blue");
  if (!extractMBZ(mbzPath, tempExtractDir)) {
    return false;
  }
  log("✓ MBZ entpackt", "green");

  // ATF_Document.json oder DSL_Document.json lesen
  log("\n2. Lese Lernwelt-Metadaten...", "blue");
  const atfPath = path.join(tempExtractDir, "ATF_Document.json");
  const dslPath = path.join(tempExtractDir, "DSL_Document.json");

  let documentPath = null;
  let documentType = null;

  if (fs.existsSync(atfPath)) {
    documentPath = atfPath;
    documentType = "ATF";
  } else if (fs.existsSync(dslPath)) {
    documentPath = dslPath;
    documentType = "DSL";
  } else {
    log("✗ Weder ATF_Document.json noch DSL_Document.json gefunden!", "red");
    removeDir(tempExtractDir);
    return false;
  }

  const worldData = JSON.parse(fs.readFileSync(documentPath, "utf-8"));
  const worldName = worldData.world.worldName;
  log(`✓ Lernwelt: ${worldName} (${documentType}-Format)`, "green");

  // Duplikats-Prüfung
  if (skipExisting && isWorldAlreadyExtracted(worldName)) {
    log(
      `\n⊘ Lernwelt "${worldName}" wurde bereits entpackt - überspringe`,
      "yellow",
    );
    removeDir(tempExtractDir);
    return { worldName, skipped: true };
  }

  // Zielverzeichnis erstellen
  const worldDir = path.join(LEARNING_WORLDS_DIR, worldName);
  const elementsDir = path.join(worldDir, "elements");
  ensureDir(elementsDir);

  // File-Mapping für DSL-Format erstellen
  log("\n3. Erstelle File-Mapping...", "blue");
  const fileMapping = await buildFileMapping(tempExtractDir);
  if (fileMapping) {
    log(`✓ ${fileMapping.size} Dateien im Mapping gefunden`, "green");
  } else {
    log("✓ ATF-Format (kein Mapping benötigt)", "green");
  }

  // Elemente verarbeiten
  log(`\n4. Verarbeite ${worldData.world.elements.length} Elemente...`, "blue");
  let successCount = 0;

  worldData.world.elements.forEach((element) => {
    if (processElement(element, tempExtractDir, elementsDir, fileMapping)) {
      successCount++;
    }
  });

  log(
    `\n✓ ${successCount}/${worldData.world.elements.length} Elemente erfolgreich verarbeitet`,
    "green",
  );

  // Dokument als world.json speichern
  log("\n5. Speichere world.json...", "blue");
  const worldJsonPath = path.join(worldDir, "world.json");

  // Optional: Type von ATF/DSL zu AWT ändern (für Backend-Kompatibilität)
  if (worldData.$type === "ATF" || worldData.$type === "DSL") {
    worldData.$type = "AWT";
  }

  fs.writeFileSync(worldJsonPath, JSON.stringify(worldData, null, 2), "utf-8");
  log(`✓ Gespeichert: ${worldName}/world.json`, "green");

  // Aufräumen
  log("\n6. Räume auf...", "blue");
  removeDir(tempExtractDir);
  log("✓ Temporäre Dateien gelöscht", "green");

  // Manifest generieren (für Browser-Export)
  generateWorldManifest(worldDir, worldName);

  log(`\n${"✓".repeat(30)} FERTIG ${"✓".repeat(30)}`, "green");
  log(`Lernwelt verfügbar unter: LearningWorlds/${worldName}/\n`, "cyan");

  return {
    worldName,
    worldDescription: worldData.world.worldDescription || "",
    elementCount: successCount,
    skipped: false,
  };
}

/**
 * Sammelt alle Dateien eines Verzeichnisses rekursiv
 * @param {string} dir - Verzeichnis zum Durchsuchen
 * @param {string} basePath - Basispfad für relative Pfade
 * @returns {string[]} - Liste der relativen Dateipfade
 */
function collectFilesRecursively(dir, basePath = "") {
  const files = [];

  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      // Rekursiv in Unterverzeichnisse
      files.push(
        ...collectFilesRecursively(path.join(dir, entry.name), relativePath),
      );
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files;
}

/**
 * Generiert manifest.json für eine Welt (Liste aller Dateien)
 * Wird für den Export von Public-Welten im Browser benötigt
 */
function generateWorldManifest(worldDir, worldName) {
  const manifestPath = path.join(worldDir, "manifest.json");

  log(`\n7. Generiere manifest.json...`, "blue");

  // Alle Dateien im Weltverzeichnis sammeln
  const allFiles = collectFilesRecursively(worldDir);

  // Manifest erstellen
  const manifest = {
    worldName,
    generatedAt: new Date().toISOString(),
    fileCount: allFiles.length,
    files: allFiles.sort(), // Sortiert für bessere Lesbarkeit
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
  log(`✓ manifest.json generiert (${allFiles.length} Dateien)`, "green");

  return manifest;
}

/**
 * Aktualisiert die worlds.json Index-Datei
 */
function updateWorldsIndex(processedWorlds) {
  const worldsJsonPath = path.join(LEARNING_WORLDS_DIR, "worlds.json");

  let worldsIndex = { worlds: [] };

  // Vorhandene worlds.json laden
  if (fs.existsSync(worldsJsonPath)) {
    worldsIndex = JSON.parse(fs.readFileSync(worldsJsonPath, "utf-8"));
  }

  // Neue Welten hinzufügen (oder existierende aktualisieren)
  processedWorlds.forEach((world, index) => {
    const existingIndex = worldsIndex.worlds.findIndex(
      (w) => w.worldName === world.worldName,
    );

    const worldEntry = {
      worldID:
        existingIndex >= 0
          ? worldsIndex.worlds[existingIndex].worldID
          : worldsIndex.worlds.length + 1,
      worldName: world.worldName,
      worldFolder: world.worldName,
      description: world.worldDescription,
      elementCount: world.elementCount,
    };

    if (existingIndex >= 0) {
      worldsIndex.worlds[existingIndex] = worldEntry;
    } else {
      worldsIndex.worlds.push(worldEntry);
    }
  });

  fs.writeFileSync(
    worldsJsonPath,
    JSON.stringify(worldsIndex, null, 2),
    "utf-8",
  );
  log(
    `\n✓ worlds.json aktualisiert (${worldsIndex.worlds.length} Welten)`,
    "green",
  );
}

/**
 * Hauptfunktion
 */
async function main() {
  log("\n" + "=".repeat(60), "cyan");
  log("  AdLer Learning World Extractor", "cyan");
  log("=".repeat(60) + "\n", "cyan");

  // Verzeichnisse sicherstellen
  ensureDir(MBZ_INPUT_DIR);
  ensureDir(LEARNING_WORLDS_DIR);

  // MBZ-Dateien finden
  let mbzFiles = [];

  // Kommandozeilenargument: Spezifische MBZ-Datei
  if (process.argv[2]) {
    const specifiedFile = path.resolve(process.argv[2]);
    if (fs.existsSync(specifiedFile) && specifiedFile.endsWith(".mbz")) {
      mbzFiles = [specifiedFile];
    } else {
      log(
        `✗ Datei nicht gefunden oder kein MBZ-Format: ${process.argv[2]}`,
        "red",
      );
      process.exit(1);
    }
  } else {
    // Alle MBZ-Dateien im MBZ Input-Ordner finden
    if (fs.existsSync(MBZ_INPUT_DIR)) {
      const files = fs.readdirSync(MBZ_INPUT_DIR);
      mbzFiles = files
        .filter((f) => f.endsWith(".mbz"))
        .map((f) => path.join(MBZ_INPUT_DIR, f));
    }

    if (mbzFiles.length === 0) {
      log("✗ Keine MBZ-Dateien gefunden in public/MBZ/", "red");
      log("\nVerwendung:", "yellow");
      log(
        "  node scripts/extractLearningWorlds.js [pfad/zur/datei.mbz]",
        "yellow",
      );
      log("  oder lege MBZ-Dateien in public/MBZ/\n", "yellow");
      process.exit(1);
    }
  }

  log(`Gefunden: ${mbzFiles.length} MBZ-Datei(en)\n`, "blue");

  // Verarbeite alle MBZ-Dateien
  const processedWorlds = [];
  const skippedWorlds = [];

  for (const mbzFile of mbzFiles) {
    const result = await processMBZ(mbzFile);
    if (result) {
      if (result.skipped) {
        skippedWorlds.push(result);
      } else {
        processedWorlds.push(result);
      }
    }
  }

  // worlds.json aktualisieren
  if (processedWorlds.length > 0) {
    updateWorldsIndex(processedWorlds);
  }

  // Temporären Ordner aufräumen
  removeDir(TEMP_DIR);

  log("\n" + "=".repeat(60), "green");
  log(`  ✓ Neu entpackt: ${processedWorlds.length} Lernwelt(en)`, "green");
  if (skippedWorlds.length > 0) {
    log(
      `  ⊘ Übersprungen: ${skippedWorlds.length} (bereits vorhanden)`,
      "yellow",
    );
  }
  log("=".repeat(60) + "\n", "green");
}

// Script ausführen
main();
