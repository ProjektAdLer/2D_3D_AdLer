import { mock } from "jest-mock-extended";
import LoadingScreenController from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreenController";
import HelpDeskModalPresenter from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModalPresenter";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import LoadingScreenViewModel from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreenViewModel";

const helpDeskModalPresenterMock = mock<HelpDeskModalPresenter>();
const viewModel = new LoadingScreenViewModel();
describe("LoadingScreenController", () => {
  let systemUnderTest: LoadingScreenController;

  beforeEach(() => {
    systemUnderTest = new LoadingScreenController(viewModel);
  });

  test("closeLoadingScreen should set viewModel Data accordingly", () => {
    systemUnderTest.closeLoadingScreen();
    expect(viewModel.isOpen.Value).toBe(false);
  });
});
