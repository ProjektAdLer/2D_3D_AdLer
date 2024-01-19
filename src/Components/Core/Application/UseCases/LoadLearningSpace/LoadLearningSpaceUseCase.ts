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
import StoryElementTO from "../../DataTransferObjects/StoryElementTO";

@injectable()
export default class LoadLearningSpaceUseCase
  implements ILoadLearningSpaceUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(USECASE_TYPES.ILoadLearningWorldUseCase)
    private loadWorldUseCase: ILoadLearningWorldUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScore: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.ISetUserLocationUseCase)
    private setUserLocationUseCase: ISetUserLocationUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase)
    private calculateSpaceAvailabilityUseCase: ICalculateLearningSpaceAvailabilityUseCase
  ) {}

  async executeAsync(data: {
    spaceID: ComponentID;
    worldID: ComponentID;
  }): Promise<void> {
    // try to get the world entity from the container, there should always be only one at most
    let worldEntity = this.getLearningWorldEntity(data.worldID);

    // if the world is not loaded yet, load it via the LoadWorldUseCase
    if (!worldEntity) {
      await this.loadWorldUseCase.executeAsync({ worldID: data.worldID });
      worldEntity = this.getLearningWorldEntity(data.worldID);
    }

    // try to find the room with a matching id
    let spaceEntity = worldEntity.spaces.find(
      (spaceEntity) => spaceEntity.id === data.spaceID
    );

    if (!spaceEntity) {
      this.logger.log(
        LogLevelTypes.ERROR,
        "LoadLearningSpaceUseCase: SpaceEntity with " +
          data.spaceID +
          " not found."
      );
      return Promise.reject("SpaceEntity with " + data.spaceID + " not found");
    }

    // create SpaceTO and fill with scoring data
    let spaceTO = this.toTO(spaceEntity);
    const spaceScoreTO = this.calculateSpaceScore.internalExecute({
      spaceID: spaceTO.id,
      worldID: worldEntity.id,
    });
    spaceTO.currentScore = spaceScoreTO.currentScore;
    spaceTO.maxScore = spaceScoreTO.maxScore;

    // fill with availability data
    const availabilityData =
      this.calculateSpaceAvailabilityUseCase.internalExecute({
        spaceID: spaceTO.id,
        worldID: worldEntity.id,
      });
    spaceTO.requirementsString = availabilityData.requirementsString;
    spaceTO.requirementsSyntaxTree = availabilityData.requirementsSyntaxTree;
    spaceTO.isAvailable = availabilityData.isAvailable;

    // set current location in user entity
    this.setUserLocationUseCase.execute({
      worldID: data.worldID,
      spaceID: data.spaceID,
    });
    this.logger.log(
      LogLevelTypes.TRACE,
      "LoadLearningSpaceUseCase: Loaded space."
    );
    this.worldPort.onLearningSpaceLoaded(spaceTO);
  }

  private toTO(spaceEntity: LearningSpaceEntity): LearningSpaceTO {
    let spaceTO = new LearningSpaceTO();
    spaceTO = Object.assign(spaceTO, structuredClone(spaceEntity));

    if (spaceEntity.introStory === null) {
      spaceTO.introStory = null;
    } else {
      let introStory = new StoryElementTO();
      Object.assign(introStory, structuredClone(spaceEntity.introStory));
      spaceTO.introStory = introStory;
    }

    if (spaceEntity.outroStory === null) {
      spaceTO.outroStory = null;
    } else {
      let outroStory = new StoryElementTO();
      Object.assign(outroStory, structuredClone(spaceEntity.introStory));
      spaceTO.introStory = outroStory;
    }

    return spaceTO;
  }

  private getLearningWorldEntity(worldID: ComponentID): LearningWorldEntity {
    return this.container.filterEntitiesOfType<LearningWorldEntity>(
      LearningWorldEntity,
      (entity) => entity.id === worldID
    )[0];
  }
}
