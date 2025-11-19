const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const express = require("express");
const path = require("path");
const fs = require("fs");
const mbzExtractor = require("./mbzExtractor");

let mainWindow;
let server;

const PORT = 3456;

function createExpressServer() {
  const expressApp = express();
  const buildPath = path.join(__dirname, "../build");

  // Check for external LearningWorlds in userData
  const userDataPath = app.getPath("userData");
  const externalWorldsPath = path.join(userDataPath, "LearningWorlds");

  // Create userData/LearningWorlds directory if it doesn't exist
  if (!fs.existsSync(externalWorldsPath)) {
    fs.mkdirSync(externalWorldsPath, { recursive: true });
  }

  // Custom middleware to serve LearningWorlds with userData priority
  // IMPORTANT: This MUST come BEFORE the build static middleware
  const embeddedWorldsPath = path.join(buildPath, "LearningWorlds");
  expressApp.use("/LearningWorlds", (req, res, next) => {
    // Try userData first
    const userDataFile = path.join(externalWorldsPath, req.path);
    if (fs.existsSync(userDataFile) && fs.statSync(userDataFile).isFile()) {
      return res.sendFile(userDataFile);
    }

    // Fallback to build directory
    const buildFile = path.join(embeddedWorldsPath, req.path);
    if (fs.existsSync(buildFile) && fs.statSync(buildFile).isFile()) {
      return res.sendFile(buildFile);
    }

    // If it's a directory request, try with express.static
    express.static(externalWorldsPath)(req, res, () => {
      express.static(embeddedWorldsPath)(req, res, next);
    });
  });

  // Serve static files from build directory with caching
  // IMPORTANT: This must come AFTER /LearningWorlds middleware
  expressApp.use(
    express.static(buildPath, {
      maxAge: "1d", // Cache for 1 day
      etag: true,
      lastModified: true,
    }),
  );

  // SPA fallback - serve index.html for all routes that don't match static files
  // Using middleware instead of route to avoid Express 5 path-to-regexp issues
  expressApp.use((req, res, next) => {
    // Skip if it's an API request or has a file extension
    if (req.path.startsWith("/api/") || path.extname(req.path)) {
      return next();
    }
    // Serve index.html for SPA routing
    res.sendFile(path.join(buildPath, "index.html"));
  });

  server = expressApp.listen(PORT, "localhost", () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });

  return server;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
      // Performance optimizations
      hardwareAcceleration: true,
      offscreen: false,
      backgroundThrottling: false,
    },
    // Show window only when ready to avoid flickering
    show: false,
    icon: path.join(__dirname, "../build/favicon.ico"),
  });

  // Show window when ready
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Load the app from local server
  mainWindow.loadURL(`http://localhost:${PORT}`);

  // Open DevTools in development mode
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }

  // Always open DevTools for debugging
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function createMenu() {
  const template = [
    {
      label: "Datei",
      submenu: [
        {
          label: "MBZ importieren...",
          accelerator: "CmdOrCtrl+O",
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ["openFile"],
              filters: [
                { name: "Moodle Backup", extensions: ["mbz"] },
                { name: "Alle Dateien", extensions: ["*"] },
              ],
            });

            if (!result.canceled && result.filePaths.length > 0) {
              mainWindow.webContents.send(
                "import-mbz-file",
                result.filePaths[0],
              );
            }
          },
        },
        {
          label: "Lernwelten verwalten...",
          accelerator: "CmdOrCtrl+M",
          click: () => {
            mainWindow.webContents.send("open-world-manager");
          },
        },
        { type: "separator" },
        { role: "quit", label: "Beenden" },
      ],
    },
    {
      label: "Bearbeiten",
      submenu: [
        { role: "undo", label: "Rückgängig" },
        { role: "redo", label: "Wiederholen" },
        { type: "separator" },
        { role: "cut", label: "Ausschneiden" },
        { role: "copy", label: "Kopieren" },
        { role: "paste", label: "Einfügen" },
        { role: "selectAll", label: "Alles auswählen" },
      ],
    },
    {
      label: "Ansicht",
      submenu: [
        { role: "reload", label: "Neu laden" },
        { role: "forceReload", label: "Erzwinge Neu laden" },
        { type: "separator" },
        { role: "resetZoom", label: "Zoom zurücksetzen" },
        { role: "zoomIn", label: "Vergrößern" },
        { role: "zoomOut", label: "Verkleinern" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Vollbild umschalten" },
      ],
    },
    {
      label: "Hilfe",
      submenu: [
        {
          label: "Über AdLer Engine",
          click: () => {
            mainWindow.webContents.send("show-about");
          },
        },
      ],
    },
  ];

  // macOS-spezifisches App-Menü
  if (process.platform === "darwin") {
    template.unshift({
      label: app.name,
      submenu: [
        { role: "about", label: `Über ${app.name}` },
        { type: "separator" },
        { role: "services", label: "Dienste" },
        { type: "separator" },
        { role: "hide", label: `${app.name} ausblenden` },
        { role: "hideOthers", label: "Andere ausblenden" },
        { role: "unhide", label: "Alle einblenden" },
        { type: "separator" },
        { role: "quit", label: "Beenden" },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  // Enable GPU acceleration
  app.commandLine.appendSwitch("enable-gpu-rasterization");
  app.commandLine.appendSwitch("enable-zero-copy");
  app.commandLine.appendSwitch("ignore-gpu-blocklist");
  app.commandLine.appendSwitch("enable-webgl");
  app.commandLine.appendSwitch("enable-accelerated-2d-canvas");

  // Register IPC handlers
  ipcMain.handle("get-user-data-path", () => {
    return app.getPath("userData");
  });

  ipcMain.handle("get-app-version", () => {
    return app.getVersion();
  });

  // MBZ Import Handler
  ipcMain.handle("import-mbz", async (event, mbzPath) => {
    try {
      const userDataPath = app.getPath("userData");
      const learningWorldsPath = path.join(userDataPath, "LearningWorlds");

      const result = await mbzExtractor.extractMBZToUserData(
        mbzPath,
        learningWorldsPath,
        (progress) => {
          event.sender.send("import-progress", progress);
        },
      );

      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  });

  // List Worlds Handler
  ipcMain.handle("list-worlds", async () => {
    try {
      const userDataPath = app.getPath("userData");
      const learningWorldsPath = path.join(userDataPath, "LearningWorlds");

      return mbzExtractor.listInstalledWorlds(learningWorldsPath);
    } catch (error) {
      console.error("Error listing worlds:", error);
      return [];
    }
  });

  // Delete World Handler
  ipcMain.handle("delete-world", async (event, worldName) => {
    try {
      const userDataPath = app.getPath("userData");
      const learningWorldsPath = path.join(userDataPath, "LearningWorlds");

      return await mbzExtractor.deleteWorld(learningWorldsPath, worldName);
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  });

  // Open MBZ File Dialog Handler
  ipcMain.handle("open-mbz-file-dialog", async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
      filters: [
        { name: "Moodle Backup", extensions: ["mbz"] },
        { name: "Alle Dateien", extensions: ["*"] },
      ],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      mainWindow.webContents.send("import-mbz-file", result.filePaths[0]);
      return { success: true, filePath: result.filePaths[0] };
    }

    return { success: false };
  });

  // Open World Manager Handler - listen to button clicks and broadcast to modal
  ipcMain.on("open-world-manager", () => {
    if (mainWindow) {
      mainWindow.webContents.send("open-world-manager");
    }
  });

  createExpressServer();
  createWindow();
  createMenu();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (server) {
    server.close();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  if (server) {
    server.close();
  }
});
