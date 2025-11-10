import { inject, injectable } from "inversify";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
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
  ) {}

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

    // Speichere cookieConsent auch in localStorage für Persistierung beim App-Start
    if (settingsEntity.cookieConsent) {
      localStorage.setItem(
        "adler_cookie_consent",
        settingsEntity.cookieConsent,
      );
      localStorage.setItem(
        "adler_cookie_consent_timestamp",
        Date.now().toString(),
      );
    }

    this.logger.log(
      LogLevelTypes.TRACE,
      `SetSettingsConfigUseCase: Settings set to: Volume:${settingsEntity.volume}, Language: ${settingsEntity.language}, HighGraphicsQualityEnabled: ${settingsEntity.highGraphicsQualityEnabled}, BreakTimeNotificationsEnabled: ${settingsEntity.breakTimeNotificationsEnabled}, CookieConsent: ${settingsEntity.cookieConsent}`,
    );
  }
}
