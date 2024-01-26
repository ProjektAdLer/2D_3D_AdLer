import { inject, injectable } from "inversify";
import IBeginStoryElementIntroCutSceneUseCase from "./IBeginStoryElementIntroCutSceneUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import StoryElementEntity from "src/Components/Core/Domain/Entities/StoryElementEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import StoryElementTO from "../../DataTransferObjects/StoryElementTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

@injectable()
export default class BeginStoryElementIntroCutSceneUseCase
  implements IBeginStoryElementIntroCutSceneUseCase
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
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort
  ) {}

  execute(): void {
    const userLocation = this.getUserLocationUseCase.execute();

    const elements =
      this.entityContainer.filterEntitiesOfType<StoryElementEntity>(
        StoryElementEntity,
        (entity) =>
          entity.worldID === userLocation.worldID &&
          entity.spaceID === userLocation.spaceID
      );

    if (elements.length === 0) return;

    const spaceScore = this.calculateLearningSpaceScoreUseCase.internalExecute({
      spaceID: elements[0].spaceID,
      worldID: elements[0].worldID,
    });

    if (spaceScore.currentScore === 0) {
      this.worldPort.onStoryElementLoaded(this.toTO(elements[0]));
      this.worldPort.onStoryElementCutSceneTriggered(StoryElementType.Intro);
    }
  }

  private toTO(entity: StoryElementEntity): StoryElementTO {
    return {
      introStoryTexts: entity.introStoryTexts,
      outroStoryTexts: entity.outroStoryTexts,
      modelType: entity.modelType,
      storyType: entity.storyType,
    } as StoryElementTO;
  }
}
