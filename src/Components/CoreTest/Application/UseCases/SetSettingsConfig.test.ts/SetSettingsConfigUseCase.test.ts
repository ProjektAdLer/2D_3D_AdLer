import { mock } from "jest-mock-extended";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import SetSettingsConfigUseCase from "../../../../Core/Application/UseCases/SetSettingsConfig/SetSettingsConfigUseCase";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ISettingsPort from "../../../../Core/Application/Ports/Interfaces/ISettingsPort";
import ILocalStoragePort from "../../../../Core/Application/Ports/Interfaces/ILocalStoragePort";

const entityContainerMock = mock<IEntityContainer>();
const loggerMock = mock<Logger>();
const localStoragePortMock = mock<ILocalStoragePort>();

describe("SetSettingsConfigUseCase", () => {
  let systemUnderTest: SetSettingsConfigUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
    CoreDIContainer.rebind<ILocalStoragePort>(
      PORT_TYPES.ILocalStoragePort,
    ).toConstantValue(localStoragePortMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.ISetSettingsConfigUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("if entityContainer returns no SettingsEntity, a new one is created", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([undefined!]);
    systemUnderTest.execute({});
    expect(entityContainerMock.useSingletonEntity).toHaveBeenCalledTimes(1);
  });
  test("settings are set correctly", () => {
    const settingsEntity = {
      volume: 0.42,
      language: "en",
      highGraphicsQualityEnabled: false,
      breakTimeNotificationsEnabled: false,
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([settingsEntity]);
    systemUnderTest.execute({
      volume: 0.84,
      language: "de",
      highGraphicsQualityEnabled: true,
      breakTimeNotificationsEnabled: true,
    });
    expect(settingsEntity.volume).toBe(0.84);
    expect(settingsEntity.language).toBe("de");
    expect(settingsEntity.highGraphicsQualityEnabled).toBe(true);
    expect(settingsEntity.breakTimeNotificationsEnabled).toBe(true);
  });

  test("cookieConsent is set correctly in entity", () => {
    const settingsEntity = {
      volume: 0.5,
      language: "de",
      highGraphicsQualityEnabled: true,
      breakTimeNotificationsEnabled: true,
      cookieConsent: undefined as undefined | "accepted" | "declined",
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([settingsEntity]);
    systemUnderTest.execute({
      cookieConsent: "accepted",
    });
    expect(settingsEntity.cookieConsent).toBe("accepted");
  });

  test("cookieConsent is saved to localStorage when set to accepted", () => {
    const settingsEntity = {
      volume: 0.5,
      language: "de",
      highGraphicsQualityEnabled: true,
      breakTimeNotificationsEnabled: true,
      cookieConsent: undefined as undefined | "accepted" | "declined",
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([settingsEntity]);
    systemUnderTest.execute({
      cookieConsent: "accepted",
    });
    expect(localStoragePortMock.setItem).toHaveBeenCalledWith(
      "adler_cookie_consent",
      "accepted",
    );
    expect(localStoragePortMock.setItem).toHaveBeenCalledWith(
      "adler_cookie_consent_timestamp",
      expect.any(String),
    );
  });

  test("cookieConsent is saved to localStorage when set to declined", () => {
    const settingsEntity = {
      volume: 0.5,
      language: "de",
      highGraphicsQualityEnabled: true,
      breakTimeNotificationsEnabled: true,
      cookieConsent: undefined as undefined | "accepted" | "declined",
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([settingsEntity]);
    systemUnderTest.execute({
      cookieConsent: "declined",
    });
    expect(localStoragePortMock.setItem).toHaveBeenCalledWith(
      "adler_cookie_consent",
      "declined",
    );
    expect(localStoragePortMock.setItem).toHaveBeenCalledWith(
      "adler_cookie_consent_timestamp",
      expect.any(String),
    );
  });

  test("partial settings update preserves existing values", () => {
    const settingsEntity = {
      volume: 0.42,
      language: "en",
      highGraphicsQualityEnabled: false,
      breakTimeNotificationsEnabled: false,
      cookieConsent: "accepted" as const,
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([settingsEntity]);
    systemUnderTest.execute({
      volume: 0.84,
    });
    expect(settingsEntity.volume).toBe(0.84);
    expect(settingsEntity.language).toBe("en");
    expect(settingsEntity.highGraphicsQualityEnabled).toBe(false);
    expect(settingsEntity.breakTimeNotificationsEnabled).toBe(false);
    expect(settingsEntity.cookieConsent).toBe("accepted");
  });

  test("all settings are persisted to localStorage", () => {
    const settingsEntity = {
      volume: 0.75,
      graphicsQuality: 2,
      language: "en",
      highGraphicsQualityEnabled: true,
      breakTimeNotificationsEnabled: false,
      cookieConsent: "accepted" as const,
      lightsEnabled: true,
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([settingsEntity]);
    systemUnderTest.execute({
      volume: 0.75,
    });
    expect(localStoragePortMock.setItem).toHaveBeenCalledWith(
      "adler_volume",
      "0.75",
    );
    expect(localStoragePortMock.setItem).toHaveBeenCalledWith(
      "adler_graphics_quality",
      "2",
    );
    expect(localStoragePortMock.setItem).toHaveBeenCalledWith(
      "adler_language",
      "en",
    );
    expect(localStoragePortMock.setItem).toHaveBeenCalledWith(
      "adler_high_graphics_quality_enabled",
      "true",
    );
    expect(localStoragePortMock.setItem).toHaveBeenCalledWith(
      "adler_break_time_notifications_enabled",
      "false",
    );
    expect(localStoragePortMock.setItem).toHaveBeenCalledWith(
      "adler_lights_enabled",
      "true",
    );
  });
});
