import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILMSPort from "../../../../../Core/Ports/LMSPort/ILMSPort";
import LoginButtonController from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonController";

const portMock = mock<ILMSPort>();

describe("ElementDropdownController", () => {
  let systemUnderTest: LoginButtonController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind(PORT_TYPES.ILMSPort).toConstantValue(portMock);
  });

  beforeEach(() => {
    systemUnderTest = new LoginButtonController();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should call the moodle port to open the login window", () => {
    systemUnderTest.displayLoginForm();
    expect(portMock.displayLoginModal).toHaveBeenCalledTimes(1);
  });
});
