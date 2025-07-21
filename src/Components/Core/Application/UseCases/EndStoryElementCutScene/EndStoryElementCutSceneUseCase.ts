import { inject, injectable } from "inversify";
import IEndStoryElementCutSceneUseCase from "./IEndStoryElementCutSceneUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import StoryElementEntity from "src/Components/Core/Domain/Entities/StoryElementEntity";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

@injectable()
export default class EndStoryElementCutSceneUseCase
  implements IEndStoryElementCutSceneUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
  ) {}

  execute({ storyType }: { storyType: StoryElementType }): void {
    const userLocation = this.getUserLocationUseCase.execute();

    const elements =
      this.entityContainer.filterEntitiesOfType<StoryElementEntity>(
        StoryElementEntity,
        (entity) =>
          entity.worldID === userLocation.worldID &&
          entity.spaceID === userLocation.spaceID,
      );

    if (elements.length === 0) return;

    this.worldPort.onStoryElementCutSceneFinished(storyType);
  }
}
