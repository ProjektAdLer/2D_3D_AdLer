import { openDB, DBSchema, IDBPDatabase } from "idb";

/**
 * Database schema for offline learning world storage
 */
interface AdlerOfflineDB extends DBSchema {
  worlds: {
    key: number;
    value: {
      worldID: number;
      worldName: string;
      worldFolder: string;
      importTimestamp: number;
      elementCount?: number;
    };
  };
  files: {
    key: string; // Format: "{worldID}/{filePath}"
    value: {
      fileKey: string; // Composite key for indexing
      worldID: number;
      path: string;
      blob: Blob;
      timestamp: number;
    };
    indexes: {
      "by-world": number; // Index by worldID
    };
  };
}

/**
 * World metadata stored in IndexedDB
 */
export interface WorldMetadata {
  worldID: number;
  worldName: string;
  worldFolder: string;
  importTimestamp: number;
  elementCount?: number;
}

/**
 * LocalStore provides IndexedDB-based storage for offline learning worlds.
 * It manages two object stores:
 * - worlds: Stores world metadata
 * - files: Stores file blobs (world.json, element files, etc.)
 */
export default class LocalStore {
  private dbName = "adler-offline-storage";
  private dbVersion = 1;
  private db: IDBPDatabase<AdlerOfflineDB> | null = null;

  /**
   * Initialize the IndexedDB database and create object stores
   */
  async init(): Promise<void> {
    try {
      this.db = await openDB<AdlerOfflineDB>(this.dbName, this.dbVersion, {
        upgrade(db) {
          // Create worlds store if it doesn't exist
          if (!db.objectStoreNames.contains("worlds")) {
            db.createObjectStore("worlds", { keyPath: "worldID" });
          }

          // Create files store if it doesn't exist
          if (!db.objectStoreNames.contains("files")) {
            // Use inline key generation - key will be computed from worldID/path
            const filesStore = db.createObjectStore("files");
            // Create index for efficient querying by worldID
            filesStore.createIndex("by-world", "worldID", { unique: false });
          }
        },
      });
    } catch (error) {
      console.error("Failed to initialize IndexedDB:", error);
      throw new Error("LocalStore initialization failed");
    }
  }

  /**
   * Ensure the database is initialized before operations
   */
  private async ensureDB(): Promise<IDBPDatabase<AdlerOfflineDB>> {
    if (!this.db) {
      await this.init();
    }
    if (!this.db) {
      throw new Error("Database initialization failed");
    }
    return this.db;
  }

  /**
   * Generate a file key from worldID and path
   */
  private getFileKey(worldID: number, path: string): string {
    return `${worldID}/${path}`;
  }

  /**
   * Save a file blob to IndexedDB
   * @param worldID The world this file belongs to
   * @param path Relative path within the world (e.g., "world.json", "elements/1.jpg")
   * @param blob The file data as a Blob
   */
  async saveFile(worldID: number, path: string, blob: Blob): Promise<void> {
    const db = await this.ensureDB();
    const key = this.getFileKey(worldID, path);

    await db.put(
      "files",
      {
        fileKey: key,
        worldID,
        path,
        blob,
        timestamp: Date.now(),
      },
      key,
    );
  }

  /**
   * Retrieve a file blob from IndexedDB
   * @param worldID The world this file belongs to
   * @param path Relative path within the world
   * @returns The file blob, or null if not found
   */
  async getFile(worldID: number, path: string): Promise<Blob | null> {
    const db = await this.ensureDB();
    const key = this.getFileKey(worldID, path);

    try {
      const result = await db.get("files", key);
      return result?.blob || null;
    } catch (error) {
      console.error(`Failed to get file ${key}:`, error);
      return null;
    }
  }

  /**
   * Check if a world exists in IndexedDB
   * @param worldID The world ID to check
   * @returns True if the world metadata exists
   */
  async worldExists(worldID: number): Promise<boolean> {
    const db = await this.ensureDB();
    const metadata = await db.get("worlds", worldID);
    return metadata !== undefined;
  }

  /**
   * Save world metadata to IndexedDB
   * @param worldID The world ID
   * @param metadata World metadata including name, folder, etc.
   */
  async saveWorldMetadata(
    worldID: number,
    metadata: Omit<WorldMetadata, "worldID">,
  ): Promise<void> {
    const db = await this.ensureDB();

    await db.put("worlds", {
      worldID,
      ...metadata,
    });
  }

  /**
   * Retrieve world metadata from IndexedDB
   * @param worldID The world ID
   * @returns World metadata, or null if not found
   */
  async getWorldMetadata(worldID: number): Promise<WorldMetadata | null> {
    const db = await this.ensureDB();

    try {
      const metadata = await db.get("worlds", worldID);
      return metadata || null;
    } catch (error) {
      console.error(`Failed to get world metadata for ${worldID}:`, error);
      return null;
    }
  }

  /**
   * Delete a world and all its files from IndexedDB
   * @param worldID The world ID to delete
   */
  async deleteWorld(worldID: number): Promise<void> {
    const db = await this.ensureDB();

    // Delete world metadata
    await db.delete("worlds", worldID);

    // Delete all files belonging to this world
    const tx = db.transaction("files", "readwrite");
    const store = tx.objectStore("files");
    const index = store.index("by-world");

    // Get all file keys for this world
    const keys = await index.getAllKeys(worldID);

    // Delete each file
    await Promise.all(keys.map((key) => store.delete(key)));

    await tx.done;
  }

  /**
   * Get all worlds stored in IndexedDB
   * @returns Array of world metadata objects
   */
  async getAllWorlds(): Promise<WorldMetadata[]> {
    const db = await this.ensureDB();

    try {
      const worlds = await db.getAll("worlds");
      return worlds;
    } catch (error) {
      console.error("Failed to get all worlds:", error);
      return [];
    }
  }

  /**
   * Calculate the total size of a world in bytes
   * @param worldID The world ID
   * @returns Total size in bytes
   */
  async getWorldSize(worldID: number): Promise<number> {
    const db = await this.ensureDB();

    try {
      const tx = db.transaction("files", "readonly");
      const store = tx.objectStore("files");
      const index = store.index("by-world");

      let totalSize = 0;
      let cursor = await index.openCursor(worldID);

      while (cursor) {
        if (cursor.value.blob) {
          totalSize += cursor.value.blob.size;
        }
        cursor = await cursor.continue();
      }

      await tx.done;
      return totalSize;
    } catch (error) {
      console.error(`Failed to calculate world size for ${worldID}:`, error);
      return 0;
    }
  }

  /**
   * Get sizes for all worlds in IndexedDB
   * @returns Map of worldID to size in bytes
   */
  async getAllWorldSizes(): Promise<Map<number, number>> {
    const worlds = await this.getAllWorlds();
    const sizes = new Map<number, number>();

    for (const world of worlds) {
      const size = await this.getWorldSize(world.worldID);
      sizes.set(world.worldID, size);
    }

    return sizes;
  }

  /**
   * Get storage usage information
   * @returns Object with used bytes and quota (if available)
   */
  async getStorageInfo(): Promise<{
    used?: number;
    quota?: number;
    available?: number;
  }> {
    if (navigator.storage && navigator.storage.estimate) {
      try {
        const estimate = await navigator.storage.estimate();
        return {
          used: estimate.usage,
          quota: estimate.quota,
          available: estimate.quota
            ? estimate.quota - (estimate.usage || 0)
            : undefined,
        };
      } catch (error) {
        console.error("Failed to estimate storage:", error);
        return {};
      }
    }
    return {};
  }

  /**
   * Check if there's enough storage space available
   * @param requiredBytes Minimum bytes needed
   * @returns True if enough space is available (or if unable to determine)
   */
  async hasEnoughSpace(requiredBytes: number): Promise<boolean> {
    const info = await this.getStorageInfo();
    if (info.available !== undefined) {
      return info.available >= requiredBytes;
    }
    // If we can't determine, assume there's enough space
    return true;
  }

  /**
   * Get all file paths and blobs for a specific world
   * @param worldID The world ID
   * @returns Array of objects containing path and blob for each file
   */
  async getAllFiles(worldID: number): Promise<{ path: string; blob: Blob }[]> {
    const db = await this.ensureDB();

    try {
      const tx = db.transaction("files", "readonly");
      const store = tx.objectStore("files");
      const index = store.index("by-world");

      const files: { path: string; blob: Blob }[] = [];
      let cursor = await index.openCursor(worldID);

      while (cursor) {
        if (cursor.value.blob && cursor.value.path) {
          files.push({
            path: cursor.value.path,
            blob: cursor.value.blob,
          });
        }
        cursor = await cursor.continue();
      }

      await tx.done;
      return files;
    } catch (error) {
      console.error(`Failed to get all files for world ${worldID}:`, error);
      return [];
    }
  }

  /**
   * Close the database connection
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}
