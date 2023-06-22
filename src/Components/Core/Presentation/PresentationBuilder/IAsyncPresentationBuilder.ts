import IPresentationBuilder from "./IPresentationBuilder";

export default interface IAsyncPresentationBuilder
  extends IPresentationBuilder {
  isCompleted: Promise<void>;
}
