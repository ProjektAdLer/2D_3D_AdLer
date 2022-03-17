import { H5PData } from "./../../Types/H5PTypes";
import { injectable } from "inversify";
import IEntityManager from "./IEntityManager";

@injectable()
export default class EntityManager implements IEntityManager {
  private h5pSubscriberList: Array<(data: boolean) => void> = [];
  private h5pDataSubscriberList: Array<(data: number) => void> = [];

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
    this.h5pSubscriberList.forEach((fn) => {
      fn(this.showH5P);
    });
  }

  setH5PData(data: number): void {
    this.h5pData = data;
    this.h5pDataSubscriberList.forEach((fn) => {
      fn(this.h5pData);
    });
  }
  subscribeH5PFlag(fn: (data: boolean) => void): void {
    this.h5pSubscriberList.push(fn);
  }
  unsubscribeH5PFlag(fn: (data: boolean) => void): void {
    this.h5pSubscriberList = this.h5pSubscriberList.filter((subscriber) => {
      return subscriber !== fn;
    });
  }
  subscribeH5PData(fn: (data: number) => void): void {
    this.h5pDataSubscriberList.push(fn);
  }
  unsubscribeH5PData(fn: (data: number) => void): void {
    this.h5pDataSubscriberList = this.h5pDataSubscriberList.filter(
      (subscriber) => {
        return subscriber !== fn;
      }
    );
  }
}
