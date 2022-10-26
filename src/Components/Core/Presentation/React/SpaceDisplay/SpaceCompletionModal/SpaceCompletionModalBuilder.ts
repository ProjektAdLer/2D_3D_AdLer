import { injectable } from "inversify";
import SpaceCompletionModalController from "./SpaceCompletionModalController";
import SpaceCompletionModalPresenter from "./SpaceCompletionModalPresenter";
import ISpaceCompletionModalController from "./ISpaceCompletionModalController";
import ISpaceCompletionModalPresenter from "./ISpaceCompletionModalPresenter";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ISpacePort from "../../../../Ports/SpacePort/ISpacePort";

@injectable()
export default class SpaceCompletionModalBuilder extends PresentationBuilder<
  SpaceCompletionModalViewModel,
  ISpaceCompletionModalController,
  undefined,
  ISpaceCompletionModalPresenter
> {
  constructor() {
    super(
      SpaceCompletionModalViewModel,
      SpaceCompletionModalController,
      undefined,
      SpaceCompletionModalPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<ISpacePort>(PORT_TYPES.ISpacePort).registerAdapter(
      this.presenter!
    );
  }
}
