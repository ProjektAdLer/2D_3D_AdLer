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
   * Refreshes the world list
   */
  onRefresh(): Promise<void>;
}
