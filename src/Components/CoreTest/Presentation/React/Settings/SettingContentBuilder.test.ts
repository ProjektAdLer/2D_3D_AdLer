import { mock } from "jest-mock-extended";
import ISettingsPort from "../../../../Core/Application/Ports/Interfaces/ISettingsPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import SettingContentBuilder from "../../../../Core/Presentation/React/Settings/SettingContentBuilder";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";

const settingsPortMock = mock<ISettingsPort>();
describe("SettingContentBuilder", () => {
  let systemUnderTest: SettingContentBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ISettingsPort).toConstantValue(
      settingsPortMock,
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    systemUnderTest = new SettingContentBuilder();
    jest
      .spyOn(HistoryWrapper, "currentLocationScope")
      .mockReturnValue(LocationScope.worldMenu);
  });

  test("constructor doesn't throw", () => {
    expect(systemUnderTest).toBeDefined();
  });

  test("buildPresenter builds the presenter and register it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(settingsPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
      LocationScope.worldMenu,
    );
  });
});
