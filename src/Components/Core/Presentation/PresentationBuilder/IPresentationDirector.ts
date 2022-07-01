import IPresentationBuilder from "./IPresentationBuilder";

/**
 * @interface IPresentationDirector
 * @description The Presentation Director directs the build process of View, Controller, Presenter and ViewModel with a specific builder.
 */
export default interface IPresentationDirector {
  /**
   * @method build
   * @description Executes the build process with the set builder. Results can be accessed via the builder. This may be split into multiple methods later on, to customize the build process.
   * @param builder The builder to use for the build process.
   */
  build(builder: IPresentationBuilder): void;
}
