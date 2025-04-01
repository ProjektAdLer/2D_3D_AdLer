import SideBarController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarController";
import history from "history/browser";
import { mock } from "jest-mock-extended";
import IControlsExplanationModalPresenter from "../../../../../Core/Presentation/React/GeneralComponents/ControlsExplanationModal/IControlsExplanationModalPresenter";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IBreakTimeNotificationOverviewPresenter from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/IBreakTimeNotificationOverviewPresenter";
import ILearningWorldCompletionModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/ILearningWorldCompletionModalPresenter";
import INarrativeFrameworkLearningSpaceContainerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/INarrativeFrameworkLearningSpaceContainerPresenter";
const historyPushMock = jest.spyOn(history, "push");

describe("SideBarController", () => {
  let systemUnderTest: SideBarController;

  beforeEach(() => {
    systemUnderTest = new SideBarController();
  });

  test("onMainMenuButtonClicked calls history.push with '/'", () => {
    systemUnderTest.onMainMenuButtonClicked();
    expect(historyPushMock).toHaveBeenCalledWith("/");
  });

  test("onWorldMenuButtonClicked calls history.push with '/worldmenu'", () => {
    systemUnderTest.onWorldMenuButtonClicked();
    expect(historyPushMock).toHaveBeenCalledWith("/worldmenu");
  });

  test("onSpaceMenuButtonClicked calls history.push with '/spacemenu'", () => {
    systemUnderTest.onSpaceMenuButtonClicked();
    expect(historyPushMock).toHaveBeenCalledWith("/spacemenu");
  });

  test("onControlsExplanationButtonClicked calls openModal on DI-bound IControlsExplanationModalPresenter", () => {
    const presenterMock = mock<IControlsExplanationModalPresenter>();
    CoreDIContainer.bind<IControlsExplanationModalPresenter>(
      PRESENTATION_TYPES.IControlsExplanationModalPresenter,
    ).toConstantValue(presenterMock);

    systemUnderTest.onControlsExplanationButtonClicked();

    expect(presenterMock.openModal).toHaveBeenCalledTimes(1);
  });

  test("onBreakTimeButtonClicked calls openModal on DI-bound IBreakTimeNotification", () => {
    const presenterMock = mock<IBreakTimeNotificationOverviewPresenter>();
    CoreDIContainer.bind<IBreakTimeNotificationOverviewPresenter>(
      PRESENTATION_TYPES.IBreakTimeNotificationOverviewPresenter,
    ).toConstantValue(presenterMock);

    systemUnderTest.onBreakTimeButtonClicked();

    expect(presenterMock.openModal).toHaveBeenCalledTimes(1);
  });

  test("onWorldCompletionModalButtonClicked calls openModal on DI-bound ILearningWorldCompletionModalPresenter", () => {
    const presenterMock = mock<ILearningWorldCompletionModalPresenter>();
    CoreDIContainer.bind<ILearningWorldCompletionModalPresenter>(
      PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
    ).toConstantValue(presenterMock);

    systemUnderTest.onWorldCompletionModalButtonClicked();

    expect(presenterMock.openModal).toHaveBeenCalledTimes(1);
  });

  test("onNarrativeFrameworkIntroButtonClicked calls openModal on DI-bound INarrativeFrameworkLearningSpaceContainerPresenter", () => {
    const presenterMock =
      mock<INarrativeFrameworkLearningSpaceContainerPresenter>();
    CoreDIContainer.bind<INarrativeFrameworkLearningSpaceContainerPresenter>(
      PRESENTATION_TYPES.INarrativeFrameworkLearningSpaceContainerPresenter,
    ).toConstantValue(presenterMock);

    systemUnderTest.onNarrativeFrameworkIntroButtonClicked();

    expect(presenterMock.openModal).toHaveBeenCalledTimes(1);
  });
});
