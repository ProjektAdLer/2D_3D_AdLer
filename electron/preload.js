const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  // Expose userData path for external LearningWorlds
  getUserDataPath: () => ipcRenderer.invoke("get-user-data-path"),

  // Platform information
  platform: process.platform,

  // App version
  getVersion: () => ipcRenderer.invoke("get-app-version"),

  // MBZ Import
  importMBZ: (mbzPath) => ipcRenderer.invoke("import-mbz", mbzPath),

  // List installed worlds
  listWorlds: () => ipcRenderer.invoke("list-worlds"),

  // Delete world
  deleteWorld: (worldName) => ipcRenderer.invoke("delete-world", worldName),

  // Listen to events from main process
  onImportMBZFile: (callback) =>
    ipcRenderer.on("import-mbz-file", (event, filePath) => callback(filePath)),
  onImportProgress: (callback) =>
    ipcRenderer.on("import-progress", (event, progress) => callback(progress)),
  onOpenWorldManager: (callback) =>
    ipcRenderer.on("open-world-manager", () => callback()),
  onShowAbout: (callback) => ipcRenderer.on("show-about", () => callback()),

  // Remove event listeners (cleanup)
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
});

console.log("Preload script loaded successfully");
