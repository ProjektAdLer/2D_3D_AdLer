import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ILearningRoomController from "./ILearningRoomController";
import ILearningRoomPort from "./ILearningRoomPort";
import LearningRoomController from "./LearningRoomController";
import LearningRoomPresenter from "./LearningRoomPresenter";
import LearningRoomView from "./LearningRoomView";
import LearningRoomViewModel from "./LearningRoomViewModel";
import SceneController from "../SceneManagment/SceneController";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import ILearningRoomView from "./ILearningRoomView";

@injectable()
export default class LearningRoomBuilder extends PresentationBuilder<
  LearningRoomViewModel,
  ILearningRoomController,
  ILearningRoomView,
  ILearningRoomPort
> {
  constructor() {
    super(
      LearningRoomViewModel,
      LearningRoomController,
      LearningRoomView,
      LearningRoomPresenter
    );
  }

  override buildViewModel(): void {
    super.buildViewModel();
    this.viewModel!.scene.Value = CoreDIContainer.get<SceneController>(
      CORE_TYPES.ISceneController
    ).Scene;
  }
}
