const { app, BrowserWindow, ipcMain } = require("electron");
const express = require("express");
const path = require("path");
const fs = require("fs");

let mainWindow;
let server;

const PORT = 3456;

function createExpressServer() {
  const expressApp = express();
  const buildPath = path.join(__dirname, "../build");

  // Serve static files from build directory with caching
  expressApp.use(
    express.static(buildPath, {
      maxAge: "1d", // Cache for 1 day
      etag: true,
      lastModified: true,
    }),
  );

  // Check for external LearningWorlds in userData
  const userDataPath = app.getPath("userData");
  const externalWorldsPath = path.join(userDataPath, "LearningWorlds");

  // Create userData/LearningWorlds directory if it doesn't exist
  if (!fs.existsSync(externalWorldsPath)) {
    fs.mkdirSync(externalWorldsPath, { recursive: true });
  }

  // Serve external LearningWorlds with priority (overrides embedded ones)
  expressApp.use("/LearningWorlds", express.static(externalWorldsPath));

  // Fallback to embedded LearningWorlds
  const embeddedWorldsPath = path.join(buildPath, "LearningWorlds");
  expressApp.use("/LearningWorlds", express.static(embeddedWorldsPath));

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

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
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

  createExpressServer();
  createWindow();

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
