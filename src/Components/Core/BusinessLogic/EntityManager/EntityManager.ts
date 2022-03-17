import { H5PData } from "./../../Types/H5PTypes";
import { injectable } from "inversify";
import IEntityManager from "./IEntityManager";

@injectable()
export default class EntityManager implements IEntityManager {
  //private subscriber: (data: boolean) => void;

  private subscriberList: Array<(data: boolean) => void> = [];
  private showH5P: boolean = false;
  private h5pData: number;
  get H5PData(): number {
    return this.h5pData;
  }
  get ShowH5PFlar(): boolean {
    return this.showH5P;
  }
  setShowH5P(flag: boolean, id?: string): void {
    this.showH5P = flag;
    this.subscriberList.forEach((fn) => {
      fn(this.showH5P);
    });
  }
  subscribeH5PFlag(fn: (data: boolean) => void): void {
    this.subscriberList.push(fn);
  }
  unsubscribeH5PFlag(fn: (data: boolean) => void): void {
    this.subscriberList = this.subscriberList.filter((subscriber) => {
      return subscriber !== fn;
    });
  }
}
