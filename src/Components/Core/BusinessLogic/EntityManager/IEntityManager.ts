export default interface IEntityManager {
  get ShowH5PFlar(): boolean;
  get H5PData(): number;
  setShowH5P(data: boolean): void;
  setH5PData(data: number): void;
  subscribeH5PFlag(fn: (data: boolean) => void): void;
  unsubscribeH5PFlag(fn: (data: boolean) => void): void;
  subscribeH5PData(fn: (data: number) => void): void;
  unsubscribeH5PData(fn: (data: number) => void): void;
}
