import { mock } from "jest-mock-extended";
import ILMSPort from "../../../../../Core/Application/Ports/Interfaces/ILMSPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import SignInAndOutComponentBuilder from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/SignInAndOutComponentBuilder";
import SignInAndOutComponentController from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/SignInAndOutComponentController";
import SignInAndOutComponentPresenter from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/SignInAndOutComponentPresenter";

const lmsPortMock = mock<ILMSPort>();

describe("SignInAndOutComponentBuilder", () => {
  let systemUnderTest: SignInAndOutComponentBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILMSPort).toConstantValue(lmsPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new SignInAndOutComponentBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      SignInAndOutComponentController
    );
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      SignInAndOutComponentPresenter
    );
  });
});
