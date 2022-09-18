import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IMoodlePort from "../../../../../Core/Ports/MoodlePort/IMoodlePort";
import MoodleLoginButtonController from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginButton/MoodleLoginButtonController";

const portMock = mock<IMoodlePort>();

describe("ElementDropdownController", () => {
  let systemUnderTest: MoodleLoginButtonController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind(PORT_TYPES.IMoodlePort).toConstantValue(portMock);
  });

  beforeEach(() => {
    systemUnderTest = new MoodleLoginButtonController();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should call the moodle port to open the login window", () => {
    systemUnderTest.displayLoginForm();
    expect(portMock.displayLoginForm).toHaveBeenCalledTimes(1);
  });
});
