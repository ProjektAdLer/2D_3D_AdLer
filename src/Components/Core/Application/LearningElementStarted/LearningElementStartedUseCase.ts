import { inject } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningElementEntity from "../../Domain/Entities/LearningElementEntity";
import IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import { IDTO } from "../Abstract/IDTO";
import ILearningElementStartedUseCase from "./ILearningElementStartedUseCase";

export default class LearningElementStartedUseCase
  implements ILearningElementStartedUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer
  ) {}
  execute(data?: { learningElementId: number }): Promise<void> {
    const entity =
      this.entityContainer.filterEntitiesOfTye<LearningElementEntity>(
        LearningElementEntity,
        (e) => e.learningElementId === data?.learningElementId
      );

    if (entity.length === 0)
      throw new Error(
        `Could not find learning element with id ${data?.learningElementId}`
      );

    entity[0].isOpen = true;

    return Promise.resolve();
  }
}
