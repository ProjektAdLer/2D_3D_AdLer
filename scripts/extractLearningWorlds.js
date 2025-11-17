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

// Konfiguration
const PUBLIC_DIR = path.join(__dirname, "..", "public");
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
    execSync(
      `tar -xzf "${mbzPath}" -C "${targetDir}" 2>&1 | grep -v "empty or unreadable filename" || true`,
      {
        stdio: "inherit",
        shell: "/bin/bash",
      },
    );

    // Prüfe ob ATF_Document.json vorhanden ist
    const atfPath = path.join(targetDir, "ATF_Document.json");
    if (fs.existsSync(atfPath)) {
      return true;
    } else {
      log(`✗ ATF_Document.json nicht im Archiv gefunden`, "red");
      return false;
    }
  } catch (error) {
    log(
      `✗ Fehler beim Entpacken von ${path.basename(mbzPath)}: ${error.message}`,
      "red",
    );
    return false;
  }
}

/**
 * Entpackt eine H5P-Datei (ist auch ein ZIP)
 */
function extractH5P(h5pPath, targetDir) {
  ensureDir(targetDir);

  try {
    execSync(`unzip -q -o "${h5pPath}" -d "${targetDir}"`, {
      stdio: "pipe",
    });
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
 * Sucht eine Datei im Verzeichnis (case-insensitive)
 */
function findFile(dir, fileName) {
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir);
  const found = files.find((f) => f.toLowerCase() === fileName.toLowerCase());

  return found ? path.join(dir, found) : null;
}

/**
 * Verarbeitet ein einzelnes Lernelement
 */
function processElement(element, tempDir, elementsDir) {
  const elementId = element.elementId;
  const elementName = element.elementName;
  const elementType = element.elementFileType;
  const category = element.elementCategory;

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
  const sourceFileName = `${elementName}.${elementType}`;
  const sourceFile = findFile(tempDir, sourceFileName);

  if (!sourceFile) {
    log(`  ⚠ Warnung: Datei nicht gefunden: ${sourceFileName}`, "yellow");
    return false;
  }

  // H5P-Elemente (sind ZIP-Archive)
  if (
    category === "h5p" ||
    category === "primitiveH5P" ||
    elementType === "h5p"
  ) {
    const h5pTargetDir = path.join(elementsDir, String(elementId));

    log(`  → Entpacke H5P: ${sourceFileName} → elements/${elementId}/`, "blue");

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
 * Verarbeitet eine MBZ-Datei
 */
function processMBZ(mbzPath) {
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

  // ATF_Document.json lesen
  log("\n2. Lese ATF_Document.json...", "blue");
  const atfPath = path.join(tempExtractDir, "ATF_Document.json");

  if (!fs.existsSync(atfPath)) {
    log("✗ ATF_Document.json nicht gefunden!", "red");
    removeDir(tempExtractDir);
    return false;
  }

  const atf = JSON.parse(fs.readFileSync(atfPath, "utf-8"));
  const worldName = atf.world.worldName;
  log(`✓ Lernwelt: ${worldName}`, "green");

  // Zielverzeichnis erstellen
  const worldDir = path.join(LEARNING_WORLDS_DIR, worldName);
  const elementsDir = path.join(worldDir, "elements");
  ensureDir(elementsDir);

  // Elemente verarbeiten
  log(`\n3. Verarbeite ${atf.world.elements.length} Elemente...`, "blue");
  let successCount = 0;

  atf.world.elements.forEach((element) => {
    if (processElement(element, tempExtractDir, elementsDir)) {
      successCount++;
    }
  });

  log(
    `\n✓ ${successCount}/${atf.world.elements.length} Elemente erfolgreich verarbeitet`,
    "green",
  );

  // ATF als world.json speichern
  log("\n4. Speichere world.json...", "blue");
  const worldJsonPath = path.join(worldDir, "world.json");

  // Optional: Type von ATF zu AWT ändern
  if (atf.$type === "ATF") {
    atf.$type = "AWT";
  }

  fs.writeFileSync(worldJsonPath, JSON.stringify(atf, null, 2), "utf-8");
  log(`✓ Gespeichert: ${worldName}/world.json`, "green");

  // Aufräumen
  log("\n5. Räume auf...", "blue");
  removeDir(tempExtractDir);
  log("✓ Temporäre Dateien gelöscht", "green");

  log(`\n${"✓".repeat(30)} FERTIG ${"✓".repeat(30)}`, "green");
  log(`Lernwelt verfügbar unter: LearningWorlds/${worldName}/\n`, "cyan");

  return {
    worldName,
    worldDescription: atf.world.worldDescription || "",
    elementCount: successCount,
  };
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
function main() {
  log("\n" + "=".repeat(60), "cyan");
  log("  AdLer Learning World Extractor", "cyan");
  log("=".repeat(60) + "\n", "cyan");

  // Verzeichnisse sicherstellen
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
    // Alle MBZ-Dateien im LearningWorlds Ordner finden
    const files = fs.readdirSync(LEARNING_WORLDS_DIR);
    mbzFiles = files
      .filter((f) => f.endsWith(".mbz"))
      .map((f) => path.join(LEARNING_WORLDS_DIR, f));

    if (mbzFiles.length === 0) {
      log("✗ Keine MBZ-Dateien gefunden in public/LearningWorlds/", "red");
      log("\nVerwendung:", "yellow");
      log(
        "  node scripts/extractLearningWorlds.js [pfad/zur/datei.mbz]",
        "yellow",
      );
      log("  oder lege MBZ-Dateien in public/LearningWorlds/\n", "yellow");
      process.exit(1);
    }
  }

  log(`Gefunden: ${mbzFiles.length} MBZ-Datei(en)\n`, "blue");

  // Verarbeite alle MBZ-Dateien
  const processedWorlds = [];

  mbzFiles.forEach((mbzFile) => {
    const result = processMBZ(mbzFile);
    if (result) {
      processedWorlds.push(result);
    }
  });

  // worlds.json aktualisieren
  if (processedWorlds.length > 0) {
    updateWorldsIndex(processedWorlds);
  }

  // Temporären Ordner aufräumen
  removeDir(TEMP_DIR);

  log("\n" + "=".repeat(60), "green");
  log(
    `  ✓ Erfolgreich: ${processedWorlds.length}/${mbzFiles.length} Lernwelten verarbeitet`,
    "green",
  );
  log("=".repeat(60) + "\n", "green");
}

// Script ausführen
main();
