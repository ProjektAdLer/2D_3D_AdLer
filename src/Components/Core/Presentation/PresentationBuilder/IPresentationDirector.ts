import IAsyncPresentationBuilder from "./IAsyncPresentationBuilder";
import IPresentationBuilder from "./IPresentationBuilder";

/**
 * @interface IPresentationDirector
 * @description The Presentation Director directs the build process of View, Controller, Presenter and ViewModel with a specific builder.
 */
export default interface IPresentationDirector {
  /**
   * @description Executes the build process with the set builder. Results can be accessed via the builder.
   * @param builder The builder to use for the build process.
   */
  build(builder: IPresentationBuilder): void;

  /**
   * @description Executes the build process with the set asynchronous builder. Results can be accessed via the builder.
   * @param builder The builder to use for the build process.
   * @returns A promise that resolves when the build process is completed.
   */
  buildAsync(builder: IAsyncPresentationBuilder): Promise<void>;
}
