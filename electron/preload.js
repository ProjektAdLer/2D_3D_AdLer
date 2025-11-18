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
});

console.log("Preload script loaded successfully");
