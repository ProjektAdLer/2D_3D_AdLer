import SideBarController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarController";
import history from "history/browser";
import { mock } from "jest-mock-extended";
import IControlsExplanationModalPresenter from "../../../../../Core/Presentation/React/GeneralComponents/ControlsExplanationModal/IControlsExplanationModalPresenter";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";

const historyPushMock = jest.spyOn(history, "push");

describe("SideBarController", () => {
  let systemUnderTest: SideBarController;

  beforeEach(() => {
    systemUnderTest = new SideBarController();
  });

  test("onMainMenuButtonClicked calls history.push with '/'", () => {
    systemUnderTest.onMainMenuButtonClicked();
    expect(historyPushMock).toBeCalledWith("/");
  });

  test("onWorldMenuButtonClicked calls history.push with '/worldmenu'", () => {
    systemUnderTest.onWorldMenuButtonClicked();
    expect(historyPushMock).toBeCalledWith("/worldmenu");
  });

  test("onSpaceMenuButtonClicked calls history.push with '/spacemenu'", () => {
    systemUnderTest.onSpaceMenuButtonClicked();
    expect(historyPushMock).toBeCalledWith("/spacemenu");
  });

  test("onControlsExplanationButtonClicked calls openModal on DI-bound IControlsExplanationModalPresenter", () => {
    const presenterMock = mock<IControlsExplanationModalPresenter>();
    CoreDIContainer.bind<IControlsExplanationModalPresenter>(
      PRESENTATION_TYPES.IControlsExplanationModalPresenter
    ).toConstantValue(presenterMock);

    systemUnderTest.onControlsExplanationButtonClicked();

    expect(presenterMock.openModal).toBeCalledTimes(1);
  });
});
