import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import ISpaceController from "./ISpaceController";
import SpaceController from "./SpaceController";
import SpacePresenter from "./SpacePresenter";
import SpaceView from "./SpaceView";
import SpaceViewModel from "./SpaceViewModel";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import ISpaceView from "./ISpaceView";
import ISpacePresenter from "./ISpacePresenter";
import ISpacePort from "../../../Ports/SpacePort/ISpacePort";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class SpaceBuilder extends PresentationBuilder<
  SpaceViewModel,
  ISpaceController,
  ISpaceView,
  ISpacePresenter
> {
  constructor() {
    super(SpaceViewModel, SpaceController, SpaceView, SpacePresenter);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ISpacePort>(
      PORT_TYPES.ISpacePort
    ).registerSpacePresenter(this.presenter!);
  }
}
