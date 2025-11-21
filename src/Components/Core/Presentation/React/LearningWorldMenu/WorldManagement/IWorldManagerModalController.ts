/**
 * Controller interface for WorldManagerModal
 * Handles user interactions in the world management modal
 */
export default interface IWorldManagerModalController {
  /**
   * Opens the world management modal
   */
  onOpenModal(): void;

  /**
   * Closes the world management modal
   */
  onCloseModal(): void;

  /**
   * Deletes a world from IndexedDB
   * @param worldID The ID of the world to delete
   */
  onDeleteWorld(worldID: number): Promise<void>;

  /**
   * Imports a world from an MBZ file
   * @param file The MBZ file to import
   */
  onImportWorld(file: File): Promise<void>;

  /**
   * Exports a world from IndexedDB as ZIP
   * @param worldID The ID of the world to export
   */
  onExportWorld(worldID: number): Promise<void>;

  /**
   * Refreshes the world list
   */
  onRefresh(): Promise<void>;
}
