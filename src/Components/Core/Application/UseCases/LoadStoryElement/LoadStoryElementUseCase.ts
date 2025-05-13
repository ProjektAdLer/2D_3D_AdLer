import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { inject, injectable } from "inversify";
import ILoadStoryElementUseCase from "./ILoadStoryElementUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import LearningSpaceEntity from "src/Components/Core/Domain/Entities/LearningSpaceEntity";
import StoryElementTO from "../../DataTransferObjects/StoryElementTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

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
    private worldPort: ILearningWorldPort,
  ) {}

  execute(storyElementType: StoryElementType): void {
    if (storyElementType === StoryElementType.None) return;

    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      this.logger.log(LogLevelTypes.WARN, `User is not in a space!`);
      return;
    }

    const learningSpaceEntity = this.getLearningSpaceEntity(
      userLocation.worldID,
      userLocation.spaceID,
    );
    if (!learningSpaceEntity) return;

    const storyTO = this.createStoryTO(learningSpaceEntity, storyElementType);

    if (storyTO) this.worldPort.onStoryElementLoaded(storyTO);
  }

  private getLearningSpaceEntity(
    worldID: number,
    spaceID: number,
  ): LearningSpaceEntity | null {
    const learningSpaceEntities =
      this.entityContainter.filterEntitiesOfType<LearningSpaceEntity>(
        LearningSpaceEntity,
        (entity) => {
          return entity.parentWorldID === worldID && entity.id === spaceID;
        },
      );

    // throw expeciton if no entities found
    if (learningSpaceEntities.length === 0) {
      this.logger.log(
        LogLevelTypes.WARN,
        `Could not find a space with spaceID ${spaceID} in world ${worldID}`,
      );
      return null;
    } else if (learningSpaceEntities.length > 1) {
      this.logger.log(
        LogLevelTypes.WARN,
        `Found more than one space with spaceID ${spaceID} in world ${worldID}`,
      );
      return null;
    }

    return learningSpaceEntities[0];
  }

  private createStoryTO(
    learningSpaceEntity: LearningSpaceEntity,
    storyElementType: StoryElementType,
  ): StoryElementTO | null {
    const storyElementEntity = learningSpaceEntity.storyElements?.find(
      (storyElement) =>
        (storyElement.storyType & storyElementType) === storyElementType,
    );

    if (!storyElementEntity) {
      this.logger.log(
        LogLevelTypes.WARN,
        `Could not find story element of type ${storyElementType}`,
      );
      return null;
    }

    let storyTO = new StoryElementTO();
    storyTO.introStoryTexts = storyElementEntity.introStoryTexts;
    storyTO.outroStoryTexts = storyElementEntity.outroStoryTexts;
    storyTO.storyType = storyElementEntity.storyType;
    storyTO.modelType = storyElementEntity.modelType;
    storyTO.storyNpcName = storyElementEntity.storyNpcName;
    return storyTO;
  }
}
