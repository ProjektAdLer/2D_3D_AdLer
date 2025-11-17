import { inject, injectable } from "inversify";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type ISettingsPort from "../../Ports/Interfaces/ISettingsPort";
import type ILocalStoragePort from "../../Ports/Interfaces/ILocalStoragePort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import ISetSettingsConfigUseCase from "./ISetSettingsConfigUseCase";
import SettingsTO from "../../DataTransferObjects/SettingsTO";
import SettingsEntity from "src/Components/Core/Domain/Entities/SettingsEntity";

@injectable()
export default class SetSettingsConfigUseCase
  implements ISetSettingsConfigUseCase
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

  private persistSettingsToLocalStorage(settings: SettingsEntity): void {
    const settingsMap: Array<[keyof SettingsEntity, string]> = [
      ["volume", "adler_volume"],
      ["graphicsQuality", "adler_graphics_quality"],
      ["language", "adler_language"],
      ["highGraphicsQualityEnabled", "adler_high_graphics_quality_enabled"],
      [
        "breakTimeNotificationsEnabled",
        "adler_break_time_notifications_enabled",
      ],
      ["cookieConsent", "adler_cookie_consent"],
      ["lightsEnabled", "adler_lights_enabled"],
    ];

    settingsMap.forEach(([key, storageKey]) => {
      const value = settings[key];
      if (value !== undefined) {
        this.localStoragePort.setItem(storageKey, value.toString());
      }
    });

    // Store timestamp for cookie consent
    if (settings.cookieConsent !== undefined) {
      this.localStoragePort.setItem(
        "adler_cookie_consent_timestamp",
        Date.now().toString(),
      );
    }
  }

  execute(settings: SettingsTO): void {
    let settingsEntity =
      this.entityContainer.getEntitiesOfType<SettingsEntity>(SettingsEntity)[0];

    if (!settingsEntity) {
      settingsEntity = {
        volume: settings.volume ?? undefined,
        graphicsQuality: settings.graphicsQuality ?? undefined,
        language: settings.language ?? undefined,
        highGraphicsQualityEnabled:
          settings.highGraphicsQualityEnabled ?? undefined,
        breakTimeNotificationsEnabled:
          settings.breakTimeNotificationsEnabled ?? undefined,
        cookieConsent: settings.cookieConsent ?? undefined,
        lightsEnabled: settings.lightsEnabled ?? undefined,
      };
      this.entityContainer.useSingletonEntity<SettingsEntity>(
        settingsEntity,
        SettingsEntity,
      );
    }
    settingsEntity.volume = settings.volume ?? settingsEntity.volume;
    settingsEntity.graphicsQuality =
      settings.graphicsQuality ?? settingsEntity.graphicsQuality;
    settingsEntity.language = settings.language ?? settingsEntity.language;
    settingsEntity.highGraphicsQualityEnabled =
      settings.highGraphicsQualityEnabled ??
      settingsEntity.highGraphicsQualityEnabled;
    settingsEntity.breakTimeNotificationsEnabled =
      settings.breakTimeNotificationsEnabled ??
      settingsEntity.breakTimeNotificationsEnabled;
    settingsEntity.cookieConsent =
      settings.cookieConsent ?? settingsEntity.cookieConsent;
    settingsEntity.lightsEnabled =
      settings.lightsEnabled ?? settingsEntity.lightsEnabled;

    // Persist all settings to localStorage for app restart
    this.persistSettingsToLocalStorage(settingsEntity);

    this.logger.log(
      LogLevelTypes.TRACE,
      `SetSettingsConfigUseCase: Settings set to: Volume:${settingsEntity.volume}, Language: ${settingsEntity.language}, HighGraphicsQualityEnabled: ${settingsEntity.highGraphicsQualityEnabled}, BreakTimeNotificationsEnabled: ${settingsEntity.breakTimeNotificationsEnabled}, CookieConsent: ${settingsEntity.cookieConsent}, Lights: ${settingsEntity.lightsEnabled}`,
    );

    // Notify all registered adapters (Presenters) about the settings update
    const settingsTO = new SettingsTO();
    settingsTO.volume = settingsEntity.volume;
    settingsTO.graphicsQuality = settingsEntity.graphicsQuality;
    settingsTO.language = settingsEntity.language;
    settingsTO.highGraphicsQualityEnabled =
      settingsEntity.highGraphicsQualityEnabled;
    settingsTO.breakTimeNotificationsEnabled =
      settingsEntity.breakTimeNotificationsEnabled;
    settingsTO.cookieConsent = settingsEntity.cookieConsent;
    settingsTO.lightsEnabled = settingsEntity.lightsEnabled;

    this.settingsPort.onSettingsUpdated(settingsTO);
  }
}
