export default interface IEntityManager {
  setShowH5P(data: boolean): void;
  subscribeH5PFlag(fn: (data: boolean) => void): void;
  get ShowH5PFlar(): boolean;
  get H5PData(): number;
  unsubscribeH5PFlag(fn: (data: boolean) => void): void;
}
