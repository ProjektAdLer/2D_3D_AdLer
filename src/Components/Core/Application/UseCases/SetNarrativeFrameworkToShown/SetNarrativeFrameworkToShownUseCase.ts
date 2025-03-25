import { inject, injectable } from "inversify";
import ISetNarrativeFrameworkToShownUseCase from "./ISetNarrativeFrameworkToShownUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import LearningWorldEntity from "../../../Domain/Entities/LearningWorldEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";
import NarrativeFrameworkTO from "../../DataTransferObjects/NarrativeFrameworkTO";

@injectable()
export default class SetNarrativeFrameworkToShownUseCase
  implements ISetNarrativeFrameworkToShownUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
  ) {}

  execute(): void {
    const data = this.getUserLocationUseCase.execute();
    let worldEntity = this.entityContainer.filterEntitiesOfType(
      LearningWorldEntity,
      (WorldEntity) => WorldEntity.id === data.worldID,
    )[0];
    if (!worldEntity.narrativeFramework) {
      this.logger.log(
        LogLevelTypes.WARN,
        `SetNarrativeFrameworkToShownUseCase: World ${worldEntity.id} has no narrative framework.`,
      );
      return;
    }
    if (worldEntity.narrativeFramework.shownBefore) {
      return;
    }
    worldEntity.narrativeFramework.shownBefore = true;

    let narrativeFrameworkTO = new NarrativeFrameworkTO();
    narrativeFrameworkTO.introText = worldEntity.narrativeFramework!.introText;
    narrativeFrameworkTO.outroText = worldEntity.narrativeFramework!.outroText;
    narrativeFrameworkTO.theme = worldEntity.theme;
    narrativeFrameworkTO.shownBefore = true;
    this.logger.log(
      LogLevelTypes.TRACE,
      `SetNarrativeFrameworkToShownUseCase: Set Narrative Framework of World with ID ${worldEntity.id} to shown.`,
    );
    this.worldPort.onNarrativeFrameworkInfoLoadedOrUpdated(
      narrativeFrameworkTO,
    );
  }
}
