import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILMSPort from "../../../../../Core/Ports/LMSPort/ILMSPort";
import MoodleLoginFormBuilder from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormBuilder";
import MoodleLoginFormController from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormController";
import MoodleLoginFormPresenter from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormPresenter";
import MoodleLoginFormViewModel from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const lmsPortMock = mock<ILMSPort>();

describe("MoodleLoginFormBuilder", () => {
  let systemUnderTest: MoodleLoginFormBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILMSPort).toConstantValue(lmsPortMock);
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new MoodleLoginFormBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      MoodleLoginFormController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      MoodleLoginFormViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the LMSPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      MoodleLoginFormPresenter
    );
    expect(lmsPortMock.registerMoodleLoginFormPresenter).toHaveBeenCalledTimes(
      1
    );
    expect(lmsPortMock.registerMoodleLoginFormPresenter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
