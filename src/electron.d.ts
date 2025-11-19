/**
 * TypeScript definitions for Electron API exposed via preload script
 */

export interface ImportProgress {
  message: string;
  progress: number; // 0-100
}

export interface ImportResult {
  success: boolean;
  worldName?: string;
  worldDescription?: string;
  elementCount?: number;
  error?: string;
}

export interface WorldInfo {
  worldID: number;
  worldName: string;
  worldFolder: string;
  description?: string;
  elementCount?: number;
  sizeInBytes: number;
  sizeFormatted: string;
}

export interface DeleteResult {
  success: boolean;
  worldName?: string;
  error?: string;
}

declare global {
  interface Window {
    electronAPI?: {
      // User data path
      getUserDataPath: () => Promise<string>;

      // Platform info
      platform: string;

      // App version
      getVersion: () => Promise<string>;

      // MBZ Import
      importMBZ: (mbzPath: string) => Promise<ImportResult>;

      // List installed worlds
      listWorlds: () => Promise<WorldInfo[]>;

      // Delete world
      deleteWorld: (worldName: string) => Promise<DeleteResult>;

      // Open file dialog for MBZ import
      openMBZFileDialog: () => Promise<{ success: boolean; filePath?: string }>;

      // Open world manager modal
      openWorldManager: () => void;

      // Event listeners
      onImportMBZFile: (callback: (filePath: string) => void) => void;
      onImportProgress: (callback: (progress: ImportProgress) => void) => void;
      onOpenWorldManager: (callback: () => void) => void;
      onShowAbout: (callback: () => void) => void;

      // Cleanup
      removeAllListeners: (channel: string) => void;
    };
  }
}

export {};
