import history from "history/browser";
import ISideBarController from "./ISideBarController";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IControlsExplanationModalPresenter from "~ReactComponents/GeneralComponents/ControlsExplanationModal/IControlsExplanationModalPresenter";
import IBreakTimeNotificationOverviewPresenter from "~ReactComponents/GeneralComponents/BreakTimeNotificationOverview/IBreakTimeNotificationOverviewPresenter";
import ILearningWorldCompletionModalPresenter from "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/ILearningWorldCompletionModalPresenter";

export default class SideBarController implements ISideBarController {
  onMainMenuButtonClicked(): void {
    history.push("/");
  }

  onWorldMenuButtonClicked(): void {
    history.push("/worldmenu");
  }

  onSpaceMenuButtonClicked(): void {
    history.push("/spacemenu");
  }

  onControlsExplanationButtonClicked(): void {
    CoreDIContainer.get<IControlsExplanationModalPresenter>(
      PRESENTATION_TYPES.IControlsExplanationModalPresenter,
    ).openModal();
  }

  onBreakTimeButtonClicked(): void {
    CoreDIContainer.get<IBreakTimeNotificationOverviewPresenter>(
      PRESENTATION_TYPES.IBreakTimeNotificationOverviewPresenter,
    ).openModal();
  }
  onWorldCompletionModalButtonClicked(): void {
    CoreDIContainer.get<ILearningWorldCompletionModalPresenter>(
      PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
    ).openModal();
  }
}
