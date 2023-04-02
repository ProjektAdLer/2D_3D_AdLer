import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import ILearningSpaceController from "./ILearningSpaceController";
import LearningSpaceController from "./LearningSpaceController";
import LearningSpacePresenter from "./LearningSpacePresenter";
import LearningSpaceView from "./LearningSpaceView";
import LearningSpaceViewModel from "./LearningSpaceViewModel";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import ILearningSpaceView from "./ILearningSpaceView";
import ILearningSpacePresenter from "./ILearningSpacePresenter";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";

@injectable()
export default class LearningSpaceBuilder extends PresentationBuilder<
  LearningSpaceViewModel,
  ILearningSpaceController,
  ILearningSpaceView,
  ILearningSpacePresenter
> {
  constructor() {
    super(
      LearningSpaceViewModel,
      LearningSpaceController,
      LearningSpaceView,
      LearningSpacePresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
