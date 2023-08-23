import { injectable } from "inversify";
import IPresentationBuilder from "./IPresentationBuilder";
import IPresentationDirector from "./IPresentationDirector";
import IAsyncPresentationBuilder from "./IAsyncPresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import ILoggerPort from "../../Application/Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../Domain/Types/LogLevelTypes";

@injectable()
export default class PresentationDirector implements IPresentationDirector {
  private logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
  public build(builder: IPresentationBuilder): void {
    // reset builder
    builder.reset();

    // execute build steps
    builder.buildViewModel();
    builder.buildController();
    builder.buildPresenter();
    builder.buildView();

    this.logger.log(
      LogLevelTypes.INFO,
      "Concluded build process of " + builder.constructor.name
    );
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
      this.logger.log(
        LogLevelTypes.INFO,
        "Concluded async build process of " + builder.constructor.name
      )
    );

    return builder.isCompleted;
  }
}
