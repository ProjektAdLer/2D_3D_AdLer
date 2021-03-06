import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ILearningRoomController from "./ILearningRoomController";
import LearningRoomController from "./LearningRoomController";
import LearningRoomPresenter from "./LearningRoomPresenter";
import LearningRoomView from "./LearningRoomView";
import LearningRoomViewModel from "./LearningRoomViewModel";
import ScenePresenter from "../SceneManagement/ScenePresenter";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import ILearningRoomView from "./ILearningRoomView";
import ILearningRoomPresenter from "./ILearningRoomPresenter";
import ILearningRoomPort from "../../../Ports/LearningRoomPort/ILearningRoomPort";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class LearningRoomBuilder extends PresentationBuilder<
  LearningRoomViewModel,
  ILearningRoomController,
  ILearningRoomView,
  ILearningRoomPresenter
> {
  constructor() {
    super(
      LearningRoomViewModel,
      LearningRoomController,
      LearningRoomView,
      LearningRoomPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningRoomPort>(
      PORT_TYPES.ILearningRoomPort
    ).addLearningRoomPresenter(this.presenter!);
  }
}
