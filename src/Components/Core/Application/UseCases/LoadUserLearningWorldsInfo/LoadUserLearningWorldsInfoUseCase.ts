import { inject, injectable } from "inversify";
import ILoadUserLearningWorldsInfoUseCase from "./ILoadUserLearningWorldsInfoUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type { IInternalLoadLearningWorldUseCase } from "../LoadLearningWorld/ILoadLearningWorldUseCase";
import type { IInternalLoadUserInitialLearningWorldsInfoUseCase } from "../LoadUserInitialLearningWorldsInfo/ILoadUserInitialLearningWorldsInfoUseCase";
import UserLearningWorldsInfoTO from "../../DataTransferObjects/UserLearningWorldsInfoTO";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";

@injectable()
export default class LoadUserLearningWorldsInfoUseCase
  implements ILoadUserLearningWorldsInfoUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScore: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(USECASE_TYPES.ILoadUserInitialLearningWorldsInfoUseCase)
    private loadInitialWorldsInfo: IInternalLoadUserInitialLearningWorldsInfoUseCase,
    @inject(USECASE_TYPES.ILoadLearningWorldUseCase)
    private loadWorld: IInternalLoadLearningWorldUseCase
  ) {}
  async executeAsync(): Promise<void> {
    const initialUserWorlds =
      await this.loadInitialWorldsInfo.internalExecuteAsync();
    this.worldPort.onUserInitialLearningWorldsInfoLoaded(initialUserWorlds);
    const userWorlds: UserLearningWorldsInfoTO = { worldInfo: [] };
    let loadWorldPromise: Promise<void>[] = [];
    initialUserWorlds.worldInfo.forEach((world) => {
      loadWorldPromise.push(
        this.loadWorld
          .internalExecuteAsync({ worldID: world.worldID })
          .then(() => {
            let worldEntity = this.container.filterEntitiesOfType(
              LearningWorldEntity,
              (WorldEntity) => WorldEntity.id === world.worldID
            )[0];
            let worldCompleted = true;
            worldEntity.spaces.forEach((space) => {
              let spaceScores = this.calculateSpaceScore.internalExecute({
                spaceID: space.id,
                worldID: worldEntity.id,
              });

              if (spaceScores.currentScore < spaceScores.requiredScore) {
                worldCompleted = false;
              }
            });
            userWorlds.worldInfo.push({
              worldID: worldEntity.id,
              worldName: worldEntity.name,
              isCompleted: worldCompleted,
            });
          })
      );
    });
    await Promise.allSettled(loadWorldPromise);
    this.logger.log(
      LogLevelTypes.TRACE,
      "LoadUserLearningWorldsUseCase: Loading user learning worlds"
    );

    this.worldPort.onUserLearningWorldsInfoLoaded(userWorlds);
    return Promise.resolve();
  }
}
