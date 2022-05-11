import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningElementEntity from "../../Domain/Entities/LearningElementEntity";
import IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import IEntityManager from "../../Domain/EntityManager/IEntityManager";
import IScoreLearningElementUseCase from "./IScoreLearningElementUseCase";

injectable();
export default class ScoreLearningElementUseCase
  implements IScoreLearningElementUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer
  ) {}

  execute(data?: { learningElementId: string }): void {
    if (!data || !data.learningElementId) {
      throw new Error("data is undefined");
    }
    let entities =
      this.entityContainer.filterEntitiesOfTye<LearningElementEntity>(
        LearningElementEntity,
        (entity) => {
          return entity.id === data.learningElementId;
        }
      );
    if (entities.length === 0)
      throw new Error(
        `Could not find learning element with id ${data?.learningElementId}`
      );
    else if (entities.length > 1)
      throw new Error(
        `Found more than one learning element with id ${data?.learningElementId}`
      );

    // entities[0];
  }
}
