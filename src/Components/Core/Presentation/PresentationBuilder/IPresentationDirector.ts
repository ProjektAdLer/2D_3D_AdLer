import IPresentationBuilder from "./IPresentationBuilder";

export default interface IPresentationDirector {
  build(): void;
  setBuilder(presentationBuilder: IPresentationBuilder): void;
}
