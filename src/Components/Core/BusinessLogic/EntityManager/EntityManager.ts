import { injectable } from "inversify";
import Observable from "../../Entities/API/Observable";
import TestEntity from "../../Entities/TestEntity";
import IEntityManager from "./IEntityManager";

@injectable()
export default class EntityManager implements IEntityManager {
  //private subscriber: (data: boolean) => void;

  private subscriberList: Array<(data: boolean) => void> = [];
  private showH5P: boolean = false;

  public test = new Observable<TestEntity>(new TestEntity());
  get H5PData(): boolean {
    return this.showH5P;
  }
  setShowH5P(flag: boolean, id?: string): void {
    this.showH5P = flag;
    this.subscriberList.forEach((fn) => {
      fn(this.showH5P);
    });
  }
  subscribeH5P(fn: (data: boolean) => void): void {
    this.subscriberList.push(fn);
  }
  unsubscribeH5P(fn: (data: boolean) => void): void {
    this.subscriberList = this.subscriberList.filter((subscriber) => {
      return subscriber !== fn;
    });
  }
}
