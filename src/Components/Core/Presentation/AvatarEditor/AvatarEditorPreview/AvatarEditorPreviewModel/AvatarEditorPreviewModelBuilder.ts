import { injectable } from "inversify";
import AvatarEditorPreviewModelPresenter from "./AvatarEditorPreviewModelPresenter";
import IAvatarEditorPreviewModelPresenter from "./IAvatarEditorPreviewModelPresenter";
import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import AvatarEditorPreveiwModelView from "./AvatarEditorPreviewModelView";
import AsyncPresentationBuilder from "../../../PresentationBuilder/AsyncPresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IAvatarPort from "src/Components/Core/Application/Ports/Interfaces/IAvatarPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
export default class AvatarEditorPreviewModelBuilder extends AsyncPresentationBuilder<
  AvatarEditorPreviewModelViewModel,
  undefined,
  AvatarEditorPreveiwModelView,
  IAvatarEditorPreviewModelPresenter
> {
  constructor() {
    super(
      AvatarEditorPreviewModelViewModel,
      undefined,
      AvatarEditorPreveiwModelView,
      AvatarEditorPreviewModelPresenter,
    );
  }

  buildView(): void {
    super.buildView();

    const logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

    this.view!.asyncSetup().then(
      () => this.resolveIsCompleted(),
      (error) => logger.log(LogLevelTypes.ERROR, error),
    );
  }

  buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort).registerAdapter(
      this.presenter!,
      HistoryWrapper.currentLocationScope(),
    );
  }
}
