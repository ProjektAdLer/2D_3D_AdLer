import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LearningSpaceGoalPanelController from "./LearningSpaceGoalPanelController";
import LearningSpaceGoalPanelPresenter from "./LearningSpaceGoalPanelPresenter";
import LearningSpaceGoalPanelViewModel from "./LearningSpaceGoalPanelViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import ILearningSpaceGoalPanelPresenter from "./ILearningSpaceGoalPanelPresenter";
import ILearningSpaceGoalPanelController from "./ILearningSpaceGoalPanelController";

@injectable()
export default class LearningSpaceGoalPanelBuilder extends PresentationBuilder<
  LearningSpaceGoalPanelViewModel,
  ILearningSpaceGoalPanelController,
  undefined,
  ILearningSpaceGoalPanelPresenter
> {
  constructor() {
    super(
      LearningSpaceGoalPanelViewModel,
      LearningSpaceGoalPanelController,
      undefined,
      LearningSpaceGoalPanelPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
