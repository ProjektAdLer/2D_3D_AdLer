import { injectable } from "inversify";
import { IDTO } from "./IDTO";
import { IUsecaseObserver } from "./IUsecaseObserver";

@injectable()
export abstract class SyncronousUsecase {
  // Classes are Objects in TS/JS - PG
  private subsribers: IUsecaseObserver[];

  public subscribe(subscriber: IUsecaseObserver): void {
    this.subsribers.push(subscriber);
  }

  public unsubscribe(subscriber: IUsecaseObserver): void {
    this.subsribers = this.subsribers.filter((sub) => {
      return sub !== subscriber;
    });
  }

  protected notify(data: IDTO): void {
    this.subsribers.forEach((subscriber) => {
      subscriber.update(data);
    });
  }
}
