import { mock } from "jest-mock-extended";
import ILMSPort from "../../../../../Core/Application/Ports/Interfaces/ILMSPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LoginComponentBuilder from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentBuilder";
import LoginComponentController from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentController";
import LoginComponentPresenter from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentPresenter";

const lmsPortMock = mock<ILMSPort>();

describe("LoginComponentBuilder", () => {
  let systemUnderTest: LoginComponentBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILMSPort).toConstantValue(lmsPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new LoginComponentBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      LoginComponentController
    );
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      LoginComponentPresenter
    );
  });
});
