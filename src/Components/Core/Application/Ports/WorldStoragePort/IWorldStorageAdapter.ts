import WorldMetadataTO from "../../DataTransferObjects/WorldMetadataTO";

/**
 * Port interface for world storage operations (wraps LocalStore).
 * This interface allows the Application layer to interact with storage without depending on the Adapters layer.
 */
export default interface IWorldStorageAdapter {
  /**
   * Initialize the storage system
   */
  init(): Promise<void>;

  /**
   * Check if a world exists in storage
   * @param worldID The world ID to check
   */
  worldExists(worldID: number): Promise<boolean>;

  /**
   * Save world metadata
   * @param worldID The world ID
   * @param metadata World metadata (without worldID)
   */
  saveWorldMetadata(
    worldID: number,
    metadata: Omit<WorldMetadataTO, "worldID">,
  ): Promise<void>;

  /**
   * Get world metadata
   * @param worldID The world ID
   */
  getWorldMetadata(worldID: number): Promise<WorldMetadataTO | null>;

  /**
   * Delete a world and all its files
   * @param worldID The world ID to delete
   */
  deleteWorld(worldID: number): Promise<void>;

  /**
   * Get all worlds stored
   */
  getAllWorlds(): Promise<WorldMetadataTO[]>;

  /**
   * Get the size of a specific world in bytes
   * @param worldID The world ID
   */
  getWorldSize(worldID: number): Promise<number>;

  /**
   * Get sizes for all worlds
   */
  getAllWorldSizes(): Promise<Map<number, number>>;

  /**
   * Get storage usage information
   */
  getStorageInfo(): Promise<{
    used?: number;
    quota?: number;
    available?: number;
  }>;

  /**
   * Check if there's enough storage space
   * @param requiredBytes Minimum bytes needed
   */
  hasEnoughSpace(requiredBytes: number): Promise<boolean>;

  /**
   * Save a file blob to storage
   * @param worldID The world this file belongs to
   * @param path Relative path within the world
   * @param blob The file data
   */
  saveFile(worldID: number, path: string, blob: Blob): Promise<void>;

  /**
   * Retrieve a file blob from storage
   * @param worldID The world this file belongs to
   * @param path Relative path within the world
   */
  getFile(worldID: number, path: string): Promise<Blob | null>;

  /**
   * Get all files for a specific world
   * @param worldID The world ID
   * @returns Array of objects containing path and blob for each file
   */
  getAllFiles(worldID: number): Promise<{ path: string; blob: Blob }[]>;
}
