export default interface IEntityManager {
  setShowH5P(data: boolean): void;
  subscribeH5P(fn: (data: boolean) => void): void;
  get H5PData(): boolean;
  unsubscribeH5P(fn: (data: boolean) => void): void;
}
