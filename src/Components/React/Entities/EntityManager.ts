import { injectable } from "inversify";
import IEntityManager from "./IEntityManager";

@injectable()
export default class EntityManager implements IEntityManager {
  private subscriber: (data: string) => void;
  setData(data: string): void {
    this.subscriber("funktioner 2 :))");
  }
  setTestSubscription(fn: (data: string) => void): void {
    this.subscriber = fn;
  }
}
