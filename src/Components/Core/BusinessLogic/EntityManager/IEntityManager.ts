import Observable from "../../Entities/API/Observable";
import TestEntity from "../../Entities/TestEntity";

export default interface IEntityManager {
  test: Observable<TestEntity>;
  setShowH5P(data: boolean): void;
  subscribeH5P(fn: (data: boolean) => void): void;
  get H5PData(): boolean;
  unsubscribeH5P(fn: (data: boolean) => void): void;
}
