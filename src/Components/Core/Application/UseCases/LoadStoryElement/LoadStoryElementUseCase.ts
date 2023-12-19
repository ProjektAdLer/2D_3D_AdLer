import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { inject, injectable } from "inversify";
import ILoadStoryElementUseCase from "./ILoadStoryElementUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import StoryElementEntity from "src/Components/Core/Domain/Entities/StoryElementEntity";
import { LoadStoryElementType } from "src/Components/Core/Domain/Types/LoadStoryElementType";
import StoryElementTextTO from "../../DataTransferObjects/StoryElementTextTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

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

  async executeAsync(storyType: LoadStoryElementType): Promise<void> {
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      throw new Error(`User is not in a space!`);
    }

    const storyEntities =
      this.entityContainter.filterEntitiesOfType<StoryElementEntity>(
        StoryElementEntity,
        (entity) => {
          return entity.spaceID === userLocation.spaceID;
        }
      );

    // throw expeciton if no entities found
    if (storyEntities.length === 0) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `Could not find a story in space with spaceID ${userLocation.spaceID} in world ${userLocation.worldID}`
      );
      throw new Error(
        `Could not find a story in space with spaceID ${userLocation.spaceID} in world ${userLocation.worldID}`
      );
    } else if (storyEntities.length > 2) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `Found more than two stories with spaceID ${userLocation.spaceID} in world ${userLocation.worldID}`
      );
      throw new Error(
        `Found more than two stories with spaceID ${userLocation.spaceID} in world ${userLocation.worldID}`
      );
    }

    let storyTO = new StoryElementTextTO();

    if (
      storyType === LoadStoryElementType.Intro ||
      storyType === LoadStoryElementType.IntroOutro
    ) {
      storyTO.introTexts = storyEntities.find((e) => {
        return e.type === StoryElementType.Intro;
      })?.storyTexts;

      this.logger.log(
        LogLevelTypes.TRACE,
        `Loaded intro story in space ${userLocation.spaceID}`
      );
    }

    if (
      storyType === LoadStoryElementType.Outro ||
      storyType === LoadStoryElementType.IntroOutro
    ) {
      storyTO.outroTexts = storyEntities.find((e) => {
        return e.type === StoryElementType.Outro;
      })?.storyTexts;

      this.logger.log(
        LogLevelTypes.TRACE,
        `Loaded outro story in space ${userLocation.spaceID}`
      );
    }

    this.worldPort.onStoryElementLoaded(storyTO);

    return Promise.resolve();
  }
}
