export default interface IWorldManagerModalPresenter {
  setupElectronListeners(): void;
  cleanupElectronListeners(): void;
  loadWorlds(): Promise<void>;
  onModalOpen(): void;
}
