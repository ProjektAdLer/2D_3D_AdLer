import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetSettingsConfigUseCase from "./IGetSettingsConfigUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import SettingsTO from "../../DataTransferObjects/SettingsTO";
import SettingsEntity from "src/Components/Core/Domain/Entities/SettingsEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type ISettingsPort from "../../Ports/Interfaces/ISettingsPort";
import type ILocalStoragePort from "../../Ports/Interfaces/ILocalStoragePort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class GetSettingsConfigUseCase
  implements IGetSettingsConfigUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.ISettingsPort)
    private settingsPort: ISettingsPort,
    @inject(PORT_TYPES.ILocalStoragePort)
    private localStoragePort: ILocalStoragePort,
  ) {}

  private loadSettingsFromLocalStorage(): SettingsEntity {
    const storedVolume = this.localStoragePort.getItem("adler_volume");
    const storedGraphicsQuality = this.localStoragePort.getItem(
      "adler_graphics_quality",
    );
    const storedLanguage = this.localStoragePort.getItem("adler_language");
    const storedHighGraphicsQualityEnabled = this.localStoragePort.getItem(
      "adler_high_graphics_quality_enabled",
    );
    const storedBreakTimeNotificationsEnabled = this.localStoragePort.getItem(
      "adler_break_time_notifications_enabled",
    );
    const storedConsent = this.localStoragePort.getItem("adler_cookie_consent");
    const storedLightsEnabled = this.localStoragePort.getItem(
      "adler_lights_enabled",
    );

    let cookieConsent: "accepted" | "declined" | undefined = undefined;
    if (storedConsent === "accepted" || storedConsent === "declined") {
      cookieConsent = storedConsent;
    }

    return {
      volume: storedVolume !== null ? parseFloat(storedVolume) : undefined,
      graphicsQuality:
        storedGraphicsQuality !== null
          ? parseInt(storedGraphicsQuality, 10)
          : undefined,
      language: storedLanguage ?? undefined,
      highGraphicsQualityEnabled:
        storedHighGraphicsQualityEnabled !== null
          ? storedHighGraphicsQualityEnabled === "true"
          : undefined,
      breakTimeNotificationsEnabled:
        storedBreakTimeNotificationsEnabled !== null
          ? storedBreakTimeNotificationsEnabled === "true"
          : undefined,
      cookieConsent,
      lightsEnabled:
        storedLightsEnabled !== null
          ? storedLightsEnabled === "true"
          : undefined,
    };
  }

  private applyDefaultValues(entity: SettingsEntity): SettingsTO {
    const settings = new SettingsTO();

    settings.breakTimeNotificationsEnabled =
      entity.breakTimeNotificationsEnabled ?? true;
    settings.highGraphicsQualityEnabled =
      entity.highGraphicsQualityEnabled ?? true;
    settings.language = entity.language ?? "de";
    settings.volume = entity.volume ?? 0.5;
    settings.graphicsQuality = entity.graphicsQuality ?? 1;
    settings.cookieConsent = entity.cookieConsent;
    settings.lightsEnabled = entity.lightsEnabled ?? true;

    return settings;
  }

  execute(): SettingsTO {
    let settingsEntity =
      this.entityContainer.getEntitiesOfType<SettingsEntity>(SettingsEntity)[0];

    if (!settingsEntity) {
      // Load all settings from localStorage on initial app start
      settingsEntity = this.loadSettingsFromLocalStorage();
      this.entityContainer.useSingletonEntity<SettingsEntity>(
        settingsEntity,
        SettingsEntity,
      );
    }

    const settings = this.applyDefaultValues(settingsEntity);

    this.logger.log(
      LogLevelTypes.TRACE,
      `GetSettingsConfigUseCase: User got settings: Volume:${settings.volume}, Language: ${settings.language}, HighGraphicsQualityEnabled: ${settings.highGraphicsQualityEnabled}, BreakTimeNotificationsEnabled: ${settings.breakTimeNotificationsEnabled}, CookieConsent: ${settings.cookieConsent}, Lights: ${settings.lightsEnabled}.`,
    );
    this.settingsPort.onSettingsUpdated(settings);
    return settings;
  }
}
