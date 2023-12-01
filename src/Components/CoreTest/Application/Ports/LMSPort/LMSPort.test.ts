import { mock } from "jest-mock-extended";
import LMSPort from "../../../../Core/Application/Ports/LMSPort/LMSPort";
import LearningWorldMenuButtonPresenter from "../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonPresenter";
import ILMSAdapter from "../../../../Core/Application/Ports/LMSPort/ILMSAdapter";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";

jest.mock("../../../../Core/Adapters/Logger/Logger");
describe("LMSPort", () => {
  let systemUnderTest: LMSPort;

  beforeEach(() => {
    systemUnderTest = new LMSPort(mock<ILoggerPort>());
  });

  test("onLoginSuccessful is being called on scorePanelPresenter", () => {
    const lmsAdapterMock1 = mock<ILMSAdapter>();
    const lmsAdapterMock2 = mock<ILMSAdapter>();
    systemUnderTest.registerAdapter(lmsAdapterMock1);
    systemUnderTest.registerAdapter(lmsAdapterMock2);

    systemUnderTest.onLoginSuccessful();

    expect(lmsAdapterMock1.onLoginSuccessful).toHaveBeenCalledTimes(1);
    expect(lmsAdapterMock2.onLoginSuccessful).toHaveBeenCalledTimes(1);
  });

  test("onLogoutSuccessful is being called on scorePanelPresenter", () => {
    const lmsAdapterMock1 = mock<ILMSAdapter>();
    const lmsAdapterMock2 = mock<ILMSAdapter>();
    systemUnderTest.registerAdapter(lmsAdapterMock1);
    systemUnderTest.registerAdapter(lmsAdapterMock2);

    systemUnderTest.onLogoutSuccessful();

    expect(lmsAdapterMock1.onLogoutSuccessful).toHaveBeenCalledTimes(1);
    expect(lmsAdapterMock2.onLogoutSuccessful).toHaveBeenCalledTimes(1);
  });
});
