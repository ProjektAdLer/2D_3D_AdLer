import { inject, injectable } from "inversify";
import IBeginStoryElementOutroCutSceneUseCase from "./IBeginStoryElementOutroCutSceneUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";
import StoryElementEntity from "src/Components/Core/Domain/Entities/StoryElementEntity";
import LearningElementEntity from "src/Components/Core/Domain/Entities/LearningElementEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import StoryElementTO from "../../DataTransferObjects/StoryElementTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import type ILoadStoryElementUseCase from "../LoadStoryElement/ILoadStoryElementUseCase";

@injectable()
export default class BeginStoryElementOutroCutSceneUseCase
  implements IBeginStoryElementOutroCutSceneUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateLearningSpaceScoreUseCase: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(USECASE_TYPES.ILoadStoryElementUseCase)
    private loadStoryElementUseCase: ILoadStoryElementUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort
  ) {}

  execute({
    scoredLearningElementID,
  }: {
    scoredLearningElementID: number;
  }): void {
    const userLocation = this.getUserLocationUseCase.execute();

    const storyElementsInSpace =
      this.entityContainer.filterEntitiesOfType<StoryElementEntity>(
        StoryElementEntity,
        (entity) =>
          entity.worldID === userLocation.worldID &&
          entity.spaceID === userLocation.spaceID
      );

    if (storyElementsInSpace.length === 0) return; // return if space has no story elements

    const scoredLearningElement =
      this.entityContainer.filterEntitiesOfType<LearningElementEntity>(
        LearningElementEntity,
        (entity) =>
          entity.id === scoredLearningElementID &&
          entity.parentWorldID === userLocation.worldID
      );

    if (
      scoredLearningElement.length === 0 ||
      scoredLearningElement.length > 1
    ) {
      this.logger.log(
        LogLevelTypes.WARN,
        "Could not find scored learning element with id " +
          scoredLearningElementID +
          " in BeginStoryElementOutroCutSceneUseCase"
      );
      return;
    }

    const spaceScore = this.calculateLearningSpaceScoreUseCase.internalExecute({
      spaceID: storyElementsInSpace[0].spaceID,
      worldID: storyElementsInSpace[0].worldID,
    });

    // only trigger cut scene if the score was below the required score before scoring the element
    // to prevent triggering the cut scene multiple times
    if (
      spaceScore.currentScore - scoredLearningElement[0].value <
        spaceScore.requiredScore &&
      spaceScore.currentScore >= spaceScore.requiredScore
    ) {
      this.loadStoryElementUseCase.execute();
      this.worldPort.onStoryElementCutSceneTriggered(StoryElementType.Outro);
    }
  }
}
