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
        language: settings.language ?? undefined,
        graphicsQuality: settings.graphicsQuality ?? undefined,
      };
      this.entityContainer.useSingletonEntity<SettingsEntity>(
        settingsEntity,
        SettingsEntity,
      );
    } else {
      settingsEntity.volume = settings.volume ?? settingsEntity.volume;
      settingsEntity.language = settings.language ?? settingsEntity.language;
      settingsEntity.graphicsQuality =
        settings.graphicsQuality ?? settingsEntity.graphicsQuality;
    }
    this.logger.log(
      LogLevelTypes.TRACE,
      `SetSettingsConfigUseCase: Settings set to: Volume:${settingsEntity.volume}, Language: ${settingsEntity.language}, GraphicsQuality: ${settingsEntity.graphicsQuality}`,
    );
  }
}
