import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IMoodlePort from "../../../../../Core/Ports/MoodlePort/IMoodlePort";
import MoodleLoginButtonBuilder from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginButton/MoodleLoginButtonBuilder";
import MoodleLoginButtonController from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginButton/MoodleLoginButtonController";
import MoodleLoginButtonPresenter from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginButton/MoodleLoginButtonPresenter";
import MoodleLoginButtonViewModel from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginButton/MoodleLoginButtonViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const moodlePortMock = mock<IMoodlePort>();

describe("MoodleLoginButtonBuilder", () => {
  let systemUnderTest: MoodleLoginButtonBuilder;

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
    systemUnderTest = new MoodleLoginButtonBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      MoodleLoginButtonController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      MoodleLoginButtonViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the MoodlePort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      MoodleLoginButtonPresenter
    );
    expect(
      moodlePortMock.registerMoodleLoginButtonPresenter
    ).toHaveBeenCalledTimes(1);
    expect(
      moodlePortMock.registerMoodleLoginButtonPresenter
    ).toHaveBeenCalledWith(systemUnderTest["presenter"]);
  });
});
