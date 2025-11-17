import { mock } from "jest-mock-extended";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import GetSettingsConfigUseCase from "../../../../Core/Application/UseCases/GetSettingsConfig/GetSettingsConfigUseCase";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ISettingsPort from "../../../../Core/Application/Ports/Interfaces/ISettingsPort";

const entityContainerMock = mock<IEntityContainer>();
const settingsPortMock = mock<ISettingsPort>();
const loggerMock = mock<Logger>();

describe("GetSettingsConfigUseCase", () => {
  let systemUnderTest: GetSettingsConfigUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
    CoreDIContainer.rebind<ISettingsPort>(
      PORT_TYPES.ISettingsPort,
    ).toConstantValue(settingsPortMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("if entityContainer returns no SettingsEntity, a new one is created", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([undefined!]);
    systemUnderTest.execute();
    expect(entityContainerMock.useSingletonEntity).toHaveBeenCalledTimes(1);
  });
  test("if entityContainer returns no SettingsEntity, port is called with default parameters", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([undefined!]);
    systemUnderTest.execute();
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      "TRACE",
      "GetSettingsConfigUseCase: User got settings: Volume:0.5, Language: de, HighGraphicsQualityEnabled: true, BreakTimeNotificationsEnabled: true, CookieConsent: undefined, Lights: true.",
    );
  });

  test("if entityContainer returns a SettingsEntity, port is called with its parameters", () => {
    const settingsEntity = {
      volume: 0.42,
      language: "en",
      highGraphicsQualityEnabled: false,
      breakTimeNotificationsEnabled: false,
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([settingsEntity]);
    systemUnderTest.execute();
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      "TRACE",
      "GetSettingsConfigUseCase: User got settings: Volume:0.42, Language: en, HighGraphicsQualityEnabled: false, BreakTimeNotificationsEnabled: false, CookieConsent: undefined, Lights: true.",
    );
  });

  test("if entityContainer returns no SettingsEntity and localStorage has cookieConsent, it is loaded", () => {
    localStorage.setItem("adler_cookie_consent", "accepted");
    entityContainerMock.getEntitiesOfType.mockReturnValue([undefined!]);
    const result = systemUnderTest.execute();
    expect(result.cookieConsent).toBe("accepted");
  });

  test("if entityContainer returns no SettingsEntity and localStorage has declined cookieConsent, it is loaded", () => {
    localStorage.setItem("adler_cookie_consent", "declined");
    entityContainerMock.getEntitiesOfType.mockReturnValue([undefined!]);
    const result = systemUnderTest.execute();
    expect(result.cookieConsent).toBe("declined");
  });

  test("cookieConsent is returned in settings when entity has it set", () => {
    const settingsEntity = {
      volume: 0.5,
      language: "de",
      highGraphicsQualityEnabled: true,
      breakTimeNotificationsEnabled: true,
      cookieConsent: "accepted" as const,
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([settingsEntity]);
    const result = systemUnderTest.execute();
    expect(result.cookieConsent).toBe("accepted");
  });

  test("settings port is called when settings are retrieved", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([undefined!]);
    systemUnderTest.execute();
    expect(settingsPortMock.onSettingsUpdated).toHaveBeenCalledTimes(1);
  });
});
