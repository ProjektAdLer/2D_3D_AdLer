import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IMoodlePort from "../../../../../Core/Ports/MoodlePort/IMoodlePort";
import MoodleLoginFormBuilder from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormBuilder";
import MoodleLoginFormController from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormController";
import MoodleLoginFormPresenter from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormPresenter";
import MoodleLoginFormViewModel from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const moodlePortMock = mock<IMoodlePort>();

describe("MoodleLoginFormBuilder", () => {
  let systemUnderTest: MoodleLoginFormBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IMoodlePort).toConstantValue(
      moodlePortMock
    );
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

  test("buildPresenter builds the presenter and register it with the MoodlePort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      MoodleLoginFormPresenter
    );
    expect(
      moodlePortMock.registerMoodleLoginFormPresenter
    ).toHaveBeenCalledTimes(1);
    expect(
      moodlePortMock.registerMoodleLoginFormPresenter
    ).toHaveBeenCalledWith(systemUnderTest["presenter"]);
  });
});
