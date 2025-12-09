import SideBarController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarController";
import history from "~ReactEntryPoint/history";
import { mock } from "jest-mock-extended";
import IControlsExplanationModalPresenter from "../../../../../Core/Presentation/React/GeneralComponents/ControlsExplanationModal/IControlsExplanationModalPresenter";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IBreakTimeNotificationOverviewPresenter from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/IBreakTimeNotificationOverviewPresenter";
import ILearningWorldCompletionModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/ILearningWorldCompletionModalPresenter";
import INarrativeFrameworkLearningSpaceContainerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/INarrativeFrameworkLearningSpaceContainerPresenter";
import IStoryElementPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";
import IBadgeOverviewModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BadgeOverviewModal/IBadgeOverviewModalPresenter";
import SideBarViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarViewModel";

const historyPushMock = jest.spyOn(history, "push");

describe("SideBarController", () => {
  let systemUnderTest: SideBarController;
  let viewModel: SideBarViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    viewModel = new SideBarViewModel();
    systemUnderTest = new SideBarController(viewModel);
  });

  afterEach(() => {
    CoreDIContainer.restore();
    CoreDIContainer.snapshot();
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

  test("onIntroStoryButtonClicked calls open on DI-bound IStoryElementPresenter with Intro type", () => {
    const presenterMock = mock<IStoryElementPresenter>();
    CoreDIContainer.bind<IStoryElementPresenter>(
      PRESENTATION_TYPES.IStoryElementPresenter,
    ).toConstantValue(presenterMock);

    systemUnderTest.onIntroStoryButtonClicked();

    expect(presenterMock.open).toHaveBeenCalledTimes(1);
    expect(presenterMock.open).toHaveBeenCalledWith(StoryElementType.Intro);
  });

  test("onOutroStoryButtonClicked calls open on DI-bound IStoryElementPresenter with Outro type", () => {
    const presenterMock = mock<IStoryElementPresenter>();
    CoreDIContainer.bind<IStoryElementPresenter>(
      PRESENTATION_TYPES.IStoryElementPresenter,
    ).toConstantValue(presenterMock);

    systemUnderTest.onOutroStoryButtonClicked();

    expect(presenterMock.open).toHaveBeenCalledTimes(1);
    expect(presenterMock.open).toHaveBeenCalledWith(StoryElementType.Outro);
  });

  test("onBadgeOverviewButtonClicked calls openModal on DI-bound IBadgeOverviewModalPresenter", () => {
    const presenterMock = mock<IBadgeOverviewModalPresenter>();
    CoreDIContainer.bind<IBadgeOverviewModalPresenter>(
      PRESENTATION_TYPES.IBadgeOverviewModalPresenter,
    ).toConstantValue(presenterMock);

    systemUnderTest.onBadgeOverviewButtonClicked();

    expect(presenterMock.openModal).toHaveBeenCalledTimes(1);
  });

  test("nextPage increments current page when not at maximum", () => {
    viewModel.currentPage.Value = 1;
    viewModel.totalPages.Value = 3;

    systemUnderTest.nextPage();

    expect(viewModel.currentPage.Value).toBe(2);
  });

  test("nextPage does not increment when at maximum page", () => {
    viewModel.currentPage.Value = 3;
    viewModel.totalPages.Value = 3;

    systemUnderTest.nextPage();

    expect(viewModel.currentPage.Value).toBe(3);
  });

  test("previousPage decrements current page when not at minimum", () => {
    viewModel.currentPage.Value = 2;
    viewModel.totalPages.Value = 3;

    systemUnderTest.previousPage();

    expect(viewModel.currentPage.Value).toBe(1);
  });

  test("previousPage does not decrement when at minimum page", () => {
    viewModel.currentPage.Value = 1;
    viewModel.totalPages.Value = 3;

    systemUnderTest.previousPage();

    expect(viewModel.currentPage.Value).toBe(1);
  });
});
