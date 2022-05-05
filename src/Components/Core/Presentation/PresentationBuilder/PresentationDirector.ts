import { injectable } from "inversify";
import IPresentationBuilder from "./IPresentationBuilder";
import IPresentationDirector from "./IPresentationDirector";

@injectable()
export default class PresentationDirector implements IPresentationDirector {
  private presentationBuilder: IPresentationBuilder;

  constructor(presentationBuilder: IPresentationBuilder) {
    this.presentationBuilder = presentationBuilder;
  }

  public build(): void {
    // reset builder
    this.presentationBuilder.reset();

    // execute build steps
    this.presentationBuilder.buildViewModel();
    this.presentationBuilder.buildController();
    this.presentationBuilder.buildView();
    this.presentationBuilder.buildPresenter();
  }

  public setBuilder(presentationBuilder: IPresentationBuilder): void {
    this.presentationBuilder = presentationBuilder;
  }
}
