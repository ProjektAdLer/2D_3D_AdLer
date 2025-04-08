import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import LearningWorldEntity from "../../../Domain/Entities/LearningWorldEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import type ILoadLearningWorldUseCase from "../LoadLearningWorld/ILoadLearningWorldUseCase";
import ILoadLearningSpaceUseCase from "./ILoadLearningSpaceUseCase";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import LearningSpaceEntity from "../../../Domain/Entities/LearningSpaceEntity";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import type ISetUserLocationUseCase from "../SetUserLocation/ISetUserLocationUseCase";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "src/Components/Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import type ICalculateLearningSpaceAvailabilityUseCase from "../CalculateLearningSpaceAvailability/ICalculateLearningSpaceAvailabilityUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import { NotificationMessages } from "src/Components/Core/Domain/Types/NotificationMessages";

@injectable()
export default class LoadLearningSpaceUseCase
  implements ILoadLearningSpaceUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.ILoadLearningWorldUseCase)
    private loadWorldUseCase: ILoadLearningWorldUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScore: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.ISetUserLocationUseCase)
    private setUserLocationUseCase: ISetUserLocationUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase)
    private calculateSpaceAvailabilityUseCase: ICalculateLearningSpaceAvailabilityUseCase,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
  ) {}

  async executeAsync(data: {
    spaceID: ComponentID;
    worldID: ComponentID;
  }): Promise<void> {
    // try to get the world entity from the container
    let worldEntity = this.getLearningWorldEntity(data.worldID);

    // if the world is not loaded yet, load it via the LoadWorldUseCase
    if (!worldEntity) {
      await this.loadWorldUseCase.executeAsync({ worldID: data.worldID });
      worldEntity = this.getLearningWorldEntity(data.worldID);
    }

    // try to find the room with a matching id
    const spaces =
      this.entityContainer.filterEntitiesOfType<LearningSpaceEntity>(
        LearningSpaceEntity,
        (e) => e.id === data.spaceID && e.parentWorldID === data.worldID,
      );
    if (spaces.length === 0 || spaces.length > 1) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `LoadLearningSpaceUseCase: Could not find matching Space with ID ${data.spaceID}.`,
      );
      throw new Error(`Could not find matching space`);
    }
    const spaceEntity = spaces[0];

    // create SpaceTO and fill with scoring data
    let spaceTO = this.toTO(spaceEntity);
    try {
      const spaceScoreTO = this.calculateSpaceScore.internalExecute({
        spaceID: spaceTO.id,
        worldID: worldEntity.id,
      });
      spaceTO.currentScore = spaceScoreTO.currentScore;
      spaceTO.maxScore = spaceScoreTO.maxScore;
    } catch (e) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.ERROR,
        "LoadLearningSpaceUseCase: Failed to calculate space score. " + e,
        NotificationMessages.SPACE_SCORING_FAILED,
      );
      return;
    }

    // fill with availability data
    const availabilityData =
      this.calculateSpaceAvailabilityUseCase.internalExecute({
        spaceID: spaceTO.id,
        worldID: worldEntity.id,
      });
    spaceTO.requirementsString = availabilityData.requirementsString;
    spaceTO.requirementsSyntaxTree = availabilityData.requirementsSyntaxTree;
    spaceTO.isAvailable = availabilityData.isAvailable;
    spaceTO.displayStrategy = spaceEntity.displayStrategy;

    // set current location in user entity
    this.setUserLocationUseCase.execute({
      worldID: data.worldID,
      spaceID: data.spaceID,
    });
    this.logger.log(
      LogLevelTypes.TRACE,
      "LoadLearningSpaceUseCase: Loaded space.",
    );
    this.worldPort.onLearningSpaceLoaded(spaceTO);
  }

  private toTO(spaceEntity: LearningSpaceEntity): LearningSpaceTO {
    let spaceTO = new LearningSpaceTO();
    spaceTO = Object.assign(spaceTO, structuredClone(spaceEntity));
    spaceTO.displayStrategy = spaceEntity.displayStrategy;

    return spaceTO;
  }

  private getLearningWorldEntity(worldID: ComponentID): LearningWorldEntity {
    return this.entityContainer.filterEntitiesOfType<LearningWorldEntity>(
      LearningWorldEntity,
      (entity) => entity.id === worldID,
    )[0];
  }
}
