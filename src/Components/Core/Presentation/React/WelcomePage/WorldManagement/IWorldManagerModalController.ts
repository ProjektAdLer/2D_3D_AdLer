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
   * Initiates deletion process - sets confirmation state in ViewModel
   * @param worldID The ID of the world to delete
   */
  onDeleteWorld(worldID: number): Promise<void>;

  /**
   * Confirms deletion of the world (called by View after user confirms dialog)
   */
  confirmDelete(): Promise<void>;

  /**
   * Cancels deletion (called by View when user cancels dialog)
   */
  cancelDelete(): void;

  /**
   * Clears the delete error state
   */
  clearDeleteError(): void;

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
   * Clears the export error state
   */
  clearExportError(): void;

  /**
   * Refreshes the world list
   */
  onRefresh(): Promise<void>;

  /**
   * Clears the pending download state (called by View after download triggered)
   */
  clearPendingDownload(): void;

  // ========== Publish Mode (Dozentenmodus) ==========

  /**
   * Toggles the publish mode on/off
   * When enabled, shows checkboxes for multi-select
   */
  togglePublishMode(): void;

  /**
   * Toggles selection of a specific world
   * @param worldID The ID of the world to toggle
   */
  toggleWorldSelection(worldID: number): void;

  /**
   * Selects all worlds
   */
  selectAllWorlds(): void;

  /**
   * Deselects all worlds
   */
  deselectAllWorlds(): void;

  /**
   * Exports selected worlds as a LearningWorlds.zip package
   * ready for deployment on a web server
   */
  exportSelectedWorldsPackage(): Promise<void>;

  /**
   * Clears the package export error state
   */
  clearPackageExportError(): void;
}
