import { ContainerModule } from "inversify";
import IMovementIndicator from "../../Presentation/Babylon/MovementIndicator/IMovementIndicator";
import PRESENTATION_TYPES from "./PRESENTATION_TYPES";
import MovementIndicator from "../../Presentation/Babylon/MovementIndicator/MovementIndicator";
import ILearningSpaceGoalPanelPresenter from "~ReactComponents/LearningSpaceDisplay/LearningSpaceGoalPanel/ILearningSpaceGoalPanelPresenter";
import LearningSpaceGoalPanelPresenter from "~ReactComponents/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelPresenter";

const PresentationDIContainer = new ContainerModule((bind) => {
  bind<IMovementIndicator>(PRESENTATION_TYPES.IMovementIndicator).to(
    MovementIndicator
  );
  // bind<ILearningSpaceGoalPanelPresenter>(
  //   PRESENTATION_TYPES.ILearningSpaceGoalPanelPresenter
  // ).to(LearningSpaceGoalPanelPresenter);
});

export default PresentationDIContainer;
