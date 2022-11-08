import { injectable } from "inversify";

@injectable()
export default abstract class Readyable {
  public readonly isReady: Promise<void>;
  protected resolveReady: (value: void | PromiseLike<void>) => void;

  constructor() {
    this.isReady = new Promise((resolve) => {
      this.resolveReady = resolve;
    });
  }
}

export interface IReadyable {
  readonly isReady: Promise<void>;
}
