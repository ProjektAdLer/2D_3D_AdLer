import { injectable } from "inversify";
import AvatarEditorController from "./AvatarEditorController";
import AvatarEditorPresenter from "./AvatarEditorPresenter";
import IAvatarEditorController from "./IAvatarEditorController";
import IAvatarEditorPresenter from "./IAvatarEditorPresenter";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import PresentationBuilder from "../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IAvatarPort from "../../Application/Ports/Interfaces/IAvatarPort";

@injectable()
export default class AvatarEditorBuilder extends PresentationBuilder<
  AvatarEditorViewModel,
  IAvatarEditorController,
  undefined,
  IAvatarEditorPresenter
> {
  constructor() {
    super(
      AvatarEditorViewModel,
      AvatarEditorController,
      undefined,
      AvatarEditorPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort).registerAdapter(
      this.presenter!,
      HistoryWrapper.currentLocationScope(),
    );
  }
}
