import { mock } from "jest-mock-extended";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import SetSettingsConfigUseCase from "../../../../Core/Application/UseCases/SetSettingsConfig/SetSettingsConfigUseCase";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ISettingsPort from "../../../../Core/Application/Ports/Interfaces/ISettingsPort";

const entityContainerMock = mock<IEntityContainer>();
const loggerMock = mock<Logger>();

describe("SetSettingsConfigUseCase", () => {
  let systemUnderTest: SetSettingsConfigUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
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
    localStorage.clear();
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
    expect(localStorage.getItem("adler_cookie_consent")).toBe("accepted");
    expect(localStorage.getItem("adler_cookie_consent_timestamp")).toBeTruthy();
  });

  test("cookieConsent is saved to localStorage when set to declined", () => {
    localStorage.clear();
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
    expect(localStorage.getItem("adler_cookie_consent")).toBe("declined");
    expect(localStorage.getItem("adler_cookie_consent_timestamp")).toBeTruthy();
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
});
