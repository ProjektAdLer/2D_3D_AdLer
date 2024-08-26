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
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import { History } from "~ReactComponents/ReactRelated/ReactEntryPoint/History";

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

    // ensure that previous instances of the presenter are unbound, when changing between spaces
    if (
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.ILearningSpaceGoalPanelPresenter
      )
    ) {
      CoreDIContainer.unbind(
        PRESENTATION_TYPES.ILearningSpaceGoalPanelPresenter
      );
    }
    CoreDIContainer.bind<ILearningSpaceGoalPanelPresenter>(
      PRESENTATION_TYPES.ILearningSpaceGoalPanelPresenter
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!, History.currentLocationScope());
  }
}
