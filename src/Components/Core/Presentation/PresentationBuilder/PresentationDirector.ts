import { injectable } from "inversify";
import IPresentationBuilder from "./IPresentationBuilder";
import IPresentationDirector from "./IPresentationDirector";

@injectable()
export default class PresentationDirector implements IPresentationDirector {
  private builder: IPresentationBuilder;

  public build(): void {
    if (!this.builder) {
      throw new Error("PresentationBuilder is not set");
    }

    // reset builder
    this.builder.reset();

    // execute build steps
    this.builder.buildViewModel();
    this.builder.buildController();
    this.builder.buildView();
    this.builder.buildPresenter();
  }

  public set Builder(newBuilder: IPresentationBuilder) {
    this.builder = newBuilder;
  }
}
