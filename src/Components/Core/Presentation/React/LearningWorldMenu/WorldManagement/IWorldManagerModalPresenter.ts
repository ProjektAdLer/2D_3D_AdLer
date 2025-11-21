/**
 * Presenter interface for WorldManagerModal
 * Handles data loading and preparation for the world management modal
 */
export default interface IWorldManagerModalPresenter {
  /**
   * Loads all worlds (IndexedDB + public folder) and storage information
   */
  loadWorlds(): Promise<void>;

  /**
   * Deletes a world from storage
   * @param worldID The ID of the world to delete
   */
  deleteWorld(worldID: number): Promise<void>;
}
