import { inject, injectable } from "inversify";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import ICalculateLearningWorldScoreUseCase, {
  InternalCalculateLearningWorldScoreUseCaseParams,
} from "./ICalculateLearningWorldScoreUseCase";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import { NotificationMessages } from "src/Components/Core/Domain/Types/NotificationMessages";

@injectable()
export default class CalculateLearningWorldScoreUseCase
  implements ICalculateLearningWorldScoreUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entitiyContainer: IEntityContainer,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScoreUseCase: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
  ) {}

  internalExecute({
    worldID,
  }: InternalCalculateLearningWorldScoreUseCaseParams): LearningWorldScoreTO {
    const result = this.calculateLearningWorldScore(worldID);
    this.logger.log(
      LogLevelTypes.TRACE,
      `CalculateLearningWorldScoreUseCase: InternalExecute, WorldID: ${worldID}."`,
    );
    return result;
  }

  execute(): void {
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID) {
      this.logger.log(
        LogLevelTypes.WARN,
        `CalculateLearningWorldScoreUseCase: User is not in a world!`,
      );
      return;
    }

    const result = this.calculateLearningWorldScore(userLocation.worldID);

    this.logger.log(
      LogLevelTypes.TRACE,
      `CalculateLearningWorldScoreUseCase: Execute, WorldID: ${userLocation.worldID}."`,
    );
    this.worldPort.onLearningWorldScored(result);
  }

  private calculateLearningWorldScore(
    worldID: ComponentID,
  ): LearningWorldScoreTO {
    const worlds =
      this.entitiyContainer.filterEntitiesOfType<LearningWorldEntity>(
        LearningWorldEntity,
        (e) => e.id === worldID,
      );

    if (worlds.length === 0) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.ERROR,
        `CalculateLearningWorldScoreUseCase: Could not find any worlds!`,
        NotificationMessages.WORLD_NOT_FOUND,
      );
      throw new Error(`Could not find any worlds!`);
    }

    // get the requested space
    const world = worlds.find((s) => s.id === worldID);
    if (!world) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `CalculateLearningWorldScoreUseCase: Could not find world with id ${worldID}`,
      );
      throw new Error(`Could not find world with id ${worldID}`);
    }

    // sum up score
    let currentScore: number = 0;
    let maxScore: number = 0;
    let requiredScore: number = 0;
    world.spaces.forEach((space) => {
      const spaceScore: LearningSpaceScoreTO =
        this.calculateSpaceScoreUseCase.internalExecute({
          spaceID: space.id,
          worldID: world.id,
        });
      currentScore += spaceScore.currentScore;
      maxScore += spaceScore.maxScore;
      requiredScore += spaceScore.requiredScore;
    });

    const result: LearningWorldScoreTO = {
      worldID: worldID,
      currentScore: currentScore,
      requiredScore: requiredScore,
      maxScore: maxScore,
    };
    return result;
  }
}
