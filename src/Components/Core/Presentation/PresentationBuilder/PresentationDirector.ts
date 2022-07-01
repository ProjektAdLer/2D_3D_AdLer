import { injectable } from "inversify";
import IPresentationBuilder from "./IPresentationBuilder";
import IPresentationDirector from "./IPresentationDirector";

@injectable()
export default class PresentationDirector implements IPresentationDirector {
  public build(builder: IPresentationBuilder): void {
    // reset builder
    builder.reset();

    // execute build steps
    builder.buildViewModel();
    builder.buildController();
    builder.buildView();
    builder.buildPresenter();
  }
}
