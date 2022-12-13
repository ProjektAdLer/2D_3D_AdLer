import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILMSPort from "../../../../../Core/Ports/LMSPort/ILMSPort";
import LoginButtonBuilder from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonBuilder";
import LoginButtonController from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonController";
import LoginButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonPresenter";
import LoginButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const lmsPortMock = mock<ILMSPort>();

describe("LoginButtonBuilder", () => {
  let systemUnderTest: LoginButtonBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILMSPort).toConstantValue(lmsPortMock);
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new LoginButtonBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(LoginButtonController);
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      LoginButtonViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the LMSPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(LoginButtonPresenter);
    expect(lmsPortMock.registerLoginButtonPresenter).toHaveBeenCalledTimes(1);
    expect(lmsPortMock.registerLoginButtonPresenter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
