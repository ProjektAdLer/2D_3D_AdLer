import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { inject, injectable } from "inversify";
import ILoadStoryElementUseCase from "./ILoadStoryElementUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import StoryElementTextTO from "../../DataTransferObjects/StoryElementTextTO";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import LearningSpaceEntity from "src/Components/Core/Domain/Entities/LearningSpaceEntity";

@injectable()
export default class LoadStoryElementUseCase
  implements ILoadStoryElementUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainter: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort
  ) {}

  execute(): void {
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      this.logger.log(LogLevelTypes.ERROR, `User is not in a space!`);
      throw new Error(`User is not in a space!`);
    }

    const learningSpaceEntity = this.getLearningSpaceEntity(
      userLocation.worldID,
      userLocation.spaceID
    );
    const storyTO = this.createStoryTextTO(learningSpaceEntity);

    this.worldPort.onStoryElementLoaded(storyTO);
  }

  private getLearningSpaceEntity(
    worldID: number,
    spaceID: number
  ): LearningSpaceEntity {
    const learningSpaceEntities =
      this.entityContainter.filterEntitiesOfType<LearningSpaceEntity>(
        LearningSpaceEntity,
        (entity) => {
          return entity.parentWorldID === worldID && entity.id === spaceID;
        }
      );

    // throw expeciton if no entities found
    if (learningSpaceEntities.length === 0) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `Could not find a space with spaceID ${spaceID} in world ${worldID}`
      );
      throw new Error(
        `Could not find a space with spaceID ${spaceID} in world ${worldID}`
      );
    } else if (learningSpaceEntities.length > 1) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `Found more than one space with spaceID ${spaceID} in world ${worldID}`
      );
      throw new Error(
        `Found more than one space with spaceID ${spaceID} in world ${worldID}`
      );
    }

    return learningSpaceEntities[0];
  }

  private createStoryTextTO(
    LearningSpaceEntity: LearningSpaceEntity
  ): StoryElementTextTO {
    let storyTO = new StoryElementTextTO();
    storyTO.introTexts = LearningSpaceEntity.introStory?.storyTexts;
    storyTO.outroTexts = LearningSpaceEntity.outroStory?.storyTexts;
    return storyTO;
  }
}
