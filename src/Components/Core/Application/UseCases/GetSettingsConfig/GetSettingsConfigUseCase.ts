import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetSettingsConfigUseCase from "./IGetSettingsConfigUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import SettingsTO from "../../DataTransferObjects/SettingsTO";
import SettingsEntity from "src/Components/Core/Domain/Entities/SettingsEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type ISettingsPort from "../../Ports/Interfaces/ISettingsPort";
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
  ) {}

  execute(): SettingsTO {
    let settingsEntity =
      this.entityContainer.getEntitiesOfType<SettingsEntity>(SettingsEntity)[0];
    let settings = new SettingsTO();

    if (!settingsEntity) {
      settingsEntity = {
        volume: undefined,
        graphicsQuality: undefined,
        language: undefined,
        highGraphicsQualityEnabled: undefined,
        breakTimeNotificationsEnabled: undefined,
      };
      this.entityContainer.useSingletonEntity<SettingsEntity>(
        settingsEntity,
        SettingsEntity,
      );
    }
    if (settingsEntity.breakTimeNotificationsEnabled === undefined) {
      settings.breakTimeNotificationsEnabled = true;
    } else {
      settings.breakTimeNotificationsEnabled =
        settingsEntity.breakTimeNotificationsEnabled;
    }

    if (settingsEntity.highGraphicsQualityEnabled === undefined) {
      settings.highGraphicsQualityEnabled = true;
    } else {
      settings.highGraphicsQualityEnabled =
        settingsEntity.highGraphicsQualityEnabled;
    }

    if (settingsEntity.language === undefined) {
      settings.language = "de";
    } else {
      settings.language = settingsEntity.language;
    }

    if (settingsEntity.volume === undefined) {
      settings.volume = 0.5;
    } else {
      settings.volume = settingsEntity.volume;
    }

    if (settingsEntity.graphicsQuality === undefined) {
      settings.graphicsQuality = 1;
    } else {
      settings.graphicsQuality = settingsEntity.graphicsQuality;
    }

    this.logger.log(
      LogLevelTypes.TRACE,
      `GetSettingsConfigUseCase: User got settings: Volume:${settings.volume}, Language: ${settings.language}, HighGraphicsQualityEnabled: ${settings.highGraphicsQualityEnabled}, BreakTimeNotificationsEnabled: ${settings.breakTimeNotificationsEnabled}.`,
    );
    this.settingsPort.onSettingsUpdated(settings);
    return settings;
  }
}
