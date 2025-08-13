import history from "history/browser";
import ISideBarController from "./ISideBarController";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IControlsExplanationModalPresenter from "~ReactComponents/GeneralComponents/ControlsExplanationModal/IControlsExplanationModalPresenter";
import IBreakTimeNotificationOverviewPresenter from "~ReactComponents/GeneralComponents/BreakTimeNotificationOverview/IBreakTimeNotificationOverviewPresenter";
import ILearningWorldCompletionModalPresenter from "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/ILearningWorldCompletionModalPresenter";
import INarrativeFrameworkLearningSpaceContainerPresenter from "~ReactComponents/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/INarrativeFrameworkLearningSpaceContainerPresenter";
import IStoryElementPresenter from "../StoryElement/IStoryElementPresenter";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import IGetNarrativeFrameworkInfoUseCase from "src/Components/Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IBadgeOverviewModalPresenter from "../BadgeOverviewModal/IBadgeOverviewModalPresenter";

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
  onNarrativeFrameworkIntroButtonClicked(): void {
    CoreDIContainer.get<INarrativeFrameworkLearningSpaceContainerPresenter>(
      PRESENTATION_TYPES.INarrativeFrameworkLearningSpaceContainerPresenter,
    ).openModal();
  }

  onIntroStoryButtonClicked(): void {
    CoreDIContainer.get<IStoryElementPresenter>(
      PRESENTATION_TYPES.IStoryElementPresenter,
    ).open(StoryElementType.Intro);
  }

  onOutroStoryButtonClicked(): void {
    CoreDIContainer.get<IStoryElementPresenter>(
      PRESENTATION_TYPES.IStoryElementPresenter,
    ).open(StoryElementType.Outro);
  }

  checkNarrativeFramework(): void {
    CoreDIContainer.get<IGetNarrativeFrameworkInfoUseCase>(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    ).execute();
  }
  onBadgeOverviewButtonClicked(): void {
    CoreDIContainer.get<IBadgeOverviewModalPresenter>(
      PRESENTATION_TYPES.IBadgeOverviewModalPresenter,
    ).openModal();
  }
}
