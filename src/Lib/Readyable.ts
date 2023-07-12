import { injectable } from "inversify";

/**
 * Abstract base class for classes that need to do some initialization before they are ready to be used.
 * Dependant classes should use isReady.then() to wait for the readyable class to be ready.
 * Call resolveIsReady in your class when the initialization is done.
 */
@injectable()
export default abstract class Readyable {
  /**
   * Promise that resolves when the class is ready. Use isReady.then() to wait for the class to be ready.
   */
  public get IsReady(): Promise<void> {
    return this.isReady;
  }
  private isReady: Promise<void>;

  /**
   * Call this method when the initialization is done.
   */
  protected resolveIsReady: (value: void | PromiseLike<void>) => void;

  protected resetIsReady(): void {
    this.isReady = new Promise((resolve) => {
      this.resolveIsReady = resolve;
    });
  }

  constructor() {
    this.resetIsReady();
  }
}

/**
 * Use this interface to expose isReady to other classes that need to wait for the class extending Readyable to be ready.
 */
export interface IReadyable {
  readonly IsReady: Promise<void>;
}
