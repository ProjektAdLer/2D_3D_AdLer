import { inject, injectable } from "inversify";
import ICalculateInitialExperiencePointsUseCase from "./ICalculateInitialExperiencePointsUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";

@injectable()
export default class CalculateInitialExperiencePointsUseCase
  implements ICalculateInitialExperiencePointsUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entitiyContainer: IEntityContainer,
  ) {}
  internalExecute(worldId: ComponentID): void {
    // Check if the world is available (should never not be available since its checked in LoadLearningWorldUseCase)
    const userDataEntity =
      this.entitiyContainer.getEntitiesOfType(UserDataEntity)[0];
    if (
      userDataEntity.availableWorlds.find(
        (world) => world.worldID === worldId,
      ) === undefined
    ) {
      this.logger.log(
        LogLevelTypes.WARN,
        "CalculateInitialExperiencePointsUseCase: World is not available!",
      );
      return;
    }
    // Check if the world can be found (should never not be found since its checked in LoadLearningWorldUseCase)
    const worldEntity = this.entitiyContainer.filterEntitiesOfType(
      LearningWorldEntity,
      (WorldEntity) => WorldEntity.id === worldId,
    )[0];
    if (!worldEntity) {
      this.logger.log(
        LogLevelTypes.WARN,
        "CalculateInitialExperiencePointsUseCase: World entity not found!",
      );
      return;
    }

    //Calculate Experience Points

    console.log("reached", worldId);
    this.logger.log(
      LogLevelTypes.TRACE,
      "CalculateInitialExperiencePointsUseCase: InternalExecute",
    );
  }
}
