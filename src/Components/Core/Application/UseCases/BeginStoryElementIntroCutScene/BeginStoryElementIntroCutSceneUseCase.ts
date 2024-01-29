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
      this.loadStoryElementUseCase.execute();
      this.worldPort.onStoryElementCutSceneTriggered(StoryElementType.Intro);
    }
  }
}
