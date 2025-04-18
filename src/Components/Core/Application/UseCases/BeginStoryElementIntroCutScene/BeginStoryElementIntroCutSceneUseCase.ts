import { inject, injectable } from "inversify";
import IBeginStoryElementIntroCutSceneUseCase from "./IBeginStoryElementIntroCutSceneUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import StoryElementEntity from "src/Components/Core/Domain/Entities/StoryElementEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import type ILoadStoryElementUseCase from "../LoadStoryElement/ILoadStoryElementUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
export default class BeginStoryElementIntroCutSceneUseCase
  implements IBeginStoryElementIntroCutSceneUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateLearningSpaceScoreUseCase: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(USECASE_TYPES.ILoadStoryElementUseCase)
    private loadStoryElementUseCase: ILoadStoryElementUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
  ) {}

  execute(): void {
    const userLocation = this.getUserLocationUseCase.execute();

    const elements =
      this.entityContainer.filterEntitiesOfType<StoryElementEntity>(
        StoryElementEntity,
        (entity) =>
          entity.worldID === userLocation.worldID &&
          entity.spaceID === userLocation.spaceID &&
          (entity.storyType & StoryElementType.Intro) ===
            StoryElementType.Intro,
      );

    if (elements.length === 0) return;

    let spaceScore = undefined;
    try {
      spaceScore = this.calculateLearningSpaceScoreUseCase.internalExecute({
        spaceID: elements[0].spaceID,
        worldID: elements[0].worldID,
      });
    } catch (e) {
      this.logger.log(
        LogLevelTypes.WARN,
        "BeginStoryElementIntroCutSceneUseCase: " +
          e +
          ". Starting intro cutscene anyway.",
      );
    }

    if (spaceScore !== undefined && spaceScore.currentScore === 0) {
      this.loadStoryElementUseCase.execute(StoryElementType.Intro);
      this.worldPort.onStoryElementCutSceneTriggered(StoryElementType.Intro);
    }
  }
}
