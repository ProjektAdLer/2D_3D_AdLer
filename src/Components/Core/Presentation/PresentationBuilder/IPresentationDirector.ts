import IPresentationBuilder from "./IPresentationBuilder";

export default interface IPresentationDirector {
  build(): void;
  set Builder(newPresentationBuilder: IPresentationBuilder);
}
