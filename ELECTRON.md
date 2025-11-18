# AdLer Engine - Electron Distribution

Diese Datei dokumentiert die Electron-Packaging-Funktionalität für die AdLer Engine.

## Übersicht

Die AdLer Engine kann als eigenständige Desktop-Anwendung für Windows, macOS und Linux verpackt werden. Die Electron-App verwendet das filebasedBackend und benötigt **keinen externen HTTP-Server**.

## Architektur

### Komponenten

1. **Electron Main Process** (`electron/main.js`)
   - Startet einen lokalen Express-Server auf `localhost:3456`
   - Liefert das React-Build-Verzeichnis aus
   - Unterstützt Hybrid-Datenquellen (eingebettete + externe LearningWorlds)
   - Verwaltet das BrowserWindow

2. **Electron Preload Script** (`electron/preload.js`)
   - Sichere API-Bridge zwischen Renderer und Main Process
   - Exponiert userData-Pfad für externe Daten

3. **FileBasedBackendAdapter**
   - Bereits vollständig kompatibel mit Electron
   - Lädt Daten von `http://localhost:3456/LearningWorlds/`
   - Nutzt localStorage für Fortschritt und Avatar-Konfiguration

### Hybrid-Datenmodus

Die App unterstützt zwei Datenquellen gleichzeitig:

- **Eingebettete Worlds**: Im Build-Verzeichnis unter `build/LearningWorlds/`
  - Werden bei der Installation mitgeliefert
  - Beispiel-Worlds: "AdLer in a Nutshell", "Grundlagen der Videoproduktion"

- **Externe Worlds**: Im userData-Verzeichnis unter `LearningWorlds/`
  - Können vom Nutzer hinzugefügt werden
  - Überschreiben eingebettete Worlds mit gleichem Namen
  - Pfad: siehe "userData-Verzeichnis" unten

## Build-Befehle

### Entwicklung

```bash
# Electron in Entwicklungsmodus starten (erfordert bereits gebautes Frontend)
npm run electron:start

# Electron mit Live-Reload (startet React Dev Server + Electron)
npm run electron:dev
```

### Produktion

```bash
# Alle Plattformen (baut nur für aktuelle Plattform ohne zusätzliche Tools)
npm run build-electron

# Nur Windows (NSIS Installer, x64)
npm run build-electron:win

# Nur macOS (DMG, x64 + ARM64)
npm run build-electron:mac

# Nur Linux (AppImage + deb, x64)
npm run build-electron:linux
```

### Build-Output

Die fertigen Distributionen werden in `dist/` abgelegt:

```
dist/
├── AdLer Engine-0.2.0.dmg           # macOS x64 (1.2GB)
├── AdLer Engine-0.2.0-arm64.dmg     # macOS ARM64 (1.2GB)
├── AdLer Engine Setup 0.2.0.exe     # Windows Installer (1.2GB)
├── AdLer Engine-0.2.0.AppImage      # Linux AppImage (1.2GB)
└── adler-engine_0.2.0_amd64.deb     # Debian Package (1.2GB)
```

## userData-Verzeichnis

Der userData-Pfad ist plattformabhängig:

- **macOS**: `~/Library/Application Support/AdLer Engine/`
- **Windows**: `%APPDATA%\AdLer Engine\`
- **Linux**: `~/.config/AdLer Engine/`

### Externe LearningWorlds hinzufügen

1. Navigiere zum userData-Verzeichnis
2. Erstelle den Ordner `LearningWorlds/` (falls nicht vorhanden)
3. Füge deine World-Ordner hinzu (Struktur siehe unten)
4. Aktualisiere `worlds.json`

**Beispiel-Struktur:**

```
~/Library/Application Support/AdLer Engine/LearningWorlds/
├── worlds.json
└── MeineWelt/
    ├── world.json
    └── elements/
        ├── 1.jpg
        ├── 2.pdf
        └── 3/  (H5P-Ordner)
```

**worlds.json Format:**

```json
{
  "worlds": [
    {
      "worldID": 123,
      "worldName": "Meine Welt",
      "worldFolder": "MeineWelt",
      "description": "Eine eigene Lernwelt",
      "elementCount": 10
    }
  ]
}
```

## Persistenz

### localStorage-Daten

Die App speichert Daten in Electron's localStorage:

- **Fortschritt**: `adler_progress_{worldID}` - Completion-Status pro Element
- **Avatar**: `adler_avatar_config` - Avatar-Konfiguration

**Speicherort**: Im userData-Verzeichnis unter `Local Storage/leveldb/`

### Daten-Reset

Um alle Daten zu löschen, lösche das userData-Verzeichnis komplett.

## Konfiguration

### electron-builder (package.json)

```json
{
  "build": {
    "appId": "com.adler.engine",
    "productName": "AdLer Engine",
    "extends": null,
    "extraMetadata": {
      "main": "electron/main.js"
    },
    "files": [
      "build/**/*",
      "electron/**/*",
      "package.json",
      "node_modules/express/**/*"
    ]
  }
}
```

### Ports

- **Express Server**: `localhost:3456`
- **React Dev Server** (nur Entwicklung): `localhost:3000`

## Troubleshooting

### "Port 3456 already in use"

```bash
# Prozess auf Port 3456 finden und beenden
lsof -ti:3456 | xargs kill -9
```

### DMG kann nicht geöffnet werden (macOS)

Die App ist nicht signiert. Rechtsklick → "Öffnen" verwenden.

Alternativ Code-Signing deaktivieren:

```bash
xattr -cr "dist/mac/AdLer Engine.app"
```

### LearningWorlds werden nicht geladen

1. Prüfe Browser-Console in DevTools (F12)
2. Prüfe Express-Server-Logs in Terminal
3. Prüfe dass `build/LearningWorlds/worlds.json` existiert
4. Prüfe userData-Pfad (siehe oben)

### App startet nicht (Windows)

Mögliche Ursachen:

- Antivirus blockiert unsigned binary
- .NET Framework fehlt
- Windows Defender SmartScreen → "Trotzdem ausführen"

## Entwicklung

### Dateien hinzufügen/ändern

- **Main Process**: `electron/main.js`
- **Preload Script**: `electron/preload.js`
- **Build-Konfiguration**: `package.json` → `build` Feld

Nach Änderungen:

```bash
npm run build-filebased  # Rebuild Frontend
npm run electron:start   # Test Electron
```

### Debugging

**Main Process:**

```bash
# Mit Chrome DevTools
npm run electron:start --inspect=5858
# Dann in Chrome: chrome://inspect
```

**Renderer Process:**

- DevTools sind bereits aktiviert in Entwicklungsmodus
- Produktionsmodus: `mainWindow.webContents.openDevTools()` in `main.js` hinzufügen

## Bekannte Einschränkungen

1. **Keine Code-Signierung**: Apps sind nicht signiert, Nutzer müssen Security-Warnungen bestätigen
2. **Große Dateigröße**: ~1.2GB pro Plattform aufgrund eingebetteter Assets
3. **Keine Auto-Updates**: Updates müssen manuell installiert werden
4. **Cross-Compilation**: Für Windows-Builds auf macOS/Linux sind zusätzliche Tools nötig (wine, mono)

## Zukunftspläne

- [ ] Code-Signierung für macOS und Windows einrichten
- [ ] App-Größe reduzieren (Assets on-demand laden)
- [ ] Auto-Update-Mechanismus mit electron-updater
- [ ] Installer-Customization (Splash-Screen, Lizenz)
- [ ] Besseres Icon (512x512+ für macOS)
