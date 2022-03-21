import TestEntity from "../../../../../Template/TestEntity";
import ObservableClass from "./ObservableClass";

export default interface IEntityManager {
  test: ObservableClass<TestEntity>;
  setShowH5P(data: boolean): void;
  subscribeH5P(fn: (data: boolean) => void): void;
  get H5PData(): boolean;
  unsubscribeH5P(fn: (data: boolean) => void): void;
}
