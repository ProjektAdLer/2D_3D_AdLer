import { mock } from "jest-mock-extended";
import SettingsPort from "../../../../Core/Application/Ports/SettingsPort/SettingsPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import ISettingsAdapter from "../../../../Core/Application/Ports/SettingsPort/ISettingsAdapter";
import SettingsTO from "../../../../Core/Application/DataTransferObjects/SettingsTO";

describe("Settingsport", () => {
  let systemUnderTest: SettingsPort;

  beforeEach(() => {
    CoreDIContainer.snapshot();
    systemUnderTest = CoreDIContainer.resolve(SettingsPort);
  });
  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("onSettingsUpdated calls a registered adapter", () => {
    const settingsAdapterMock = mock<ISettingsAdapter>();
    systemUnderTest.registerAdapter(settingsAdapterMock);
    const settingsTO = mock<SettingsTO>();

    systemUnderTest.onSettingsUpdated(settingsTO);

    expect(settingsAdapterMock.onSettingsUpdated).toBeCalledWith(settingsTO);
  });

  test("name returns LEARNING-WORLD-PORT", () => {
    expect(systemUnderTest.name()).toBe("SETTINGS-PORT");
  });
});
