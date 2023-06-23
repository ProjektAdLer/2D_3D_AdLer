import { injectable } from "inversify";
import IPresentationBuilder from "./IPresentationBuilder";
import IPresentationDirector from "./IPresentationDirector";
import IAsyncPresentationBuilder from "./IAsyncPresentationBuilder";
import { logger } from "../../../../Lib/Logger";

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

    logger.log("Concluded build process of " + builder.constructor.name);
  }

  public buildAsync(builder: IAsyncPresentationBuilder): Promise<void> {
    // reset builder
    builder.reset();

    // execute build steps
    builder.buildViewModel();
    builder.buildController();
    builder.buildPresenter();
    builder.buildView();

    builder.isCompleted.then(() =>
      logger.log("Concluded async build process of " + builder.constructor.name)
    );

    return builder.isCompleted;
  }
}
