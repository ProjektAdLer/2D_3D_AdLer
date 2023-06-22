import { injectable } from "inversify";
import IPresentationBuilder from "./IPresentationBuilder";
import IPresentationDirector from "./IPresentationDirector";
import IAsyncPresentationBuilder from "./IAsyncPresentationBuilder";

@injectable()
export default class PresentationDirector implements IPresentationDirector {
  public build(builder: IPresentationBuilder): void {
    // reset builder
    builder.reset();

    // execute build steps
    builder.buildViewModel();
    builder.buildController();
    builder.buildPresenter();
    builder.buildView();
  }

  public buildAsync(builder: IAsyncPresentationBuilder): Promise<void> {
    // reset builder
    builder.reset();

    // execute build steps
    builder.buildViewModel();
    builder.buildController();
    builder.buildPresenter();
    builder.buildView();

    return builder.isCompleted;
  }
}
