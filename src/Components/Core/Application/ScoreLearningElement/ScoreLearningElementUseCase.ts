import { LearningComponentID } from "./../../Types/EnitityTypes";
import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../DependencyInjection/UseCases/USECASE_SYMBOLS";
import IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import IScoreLearningElementUseCase from "./IScoreLearningElementUseCase";
import { type IBackend } from "../../Adapters/Backend/IBackend";
import ICalculateTotalRoomScore from "../CalculateTotalRoomScore/ICalculateTotalRoomScore";
import LearningElementEntity from "../../Domain/Entities/LearningElementEntity";
import LearningRoomEntity from "../../Domain/Entities/LearningRoomEntity";

@injectable()
export default class ScoreLearningElementUseCase
  implements IScoreLearningElementUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackend)
    private backend: IBackend,
    @inject(USECASE_TYPES.ICalculateTotalRoomScore)
    private calculateTotalRoomScoreUseCase: ICalculateTotalRoomScore
  ) {}

  async executeAsync(data?: {
    learningElementId: LearningComponentID;
  }): Promise<void> {
    if (!data || !data.learningElementId) {
      throw new Error("data is undefined");
    }
    let learningElements =
      this.entityContainer.filterEntitiesOfType<LearningElementEntity>(
        LearningElementEntity,
        (entity) => {
          return entity.id === data.learningElementId;
        }
      );
    if (learningElements.length === 0)
      throw new Error(
        `Could not find learning element with id ${data?.learningElementId}`
      );
    else if (learningElements.length > 1)
      throw new Error(
        `Found more than one learning element with id ${data?.learningElementId}`
      );

    await this.backend
      .scoreLearningElement(learningElements[0].id)
      .catch((err) => {
        throw new Error("Could not score learning element via Backend");
      });

    learningElements[0].hasScored = true;

    const learningRoom =
      this.entityContainer.filterEntitiesOfType<LearningRoomEntity>(
        LearningRoomEntity,
        (room) => room.learningElements.includes(learningElements[0])
      )[0];

    if (!learningRoom)
      throw new Error(
        `Could not find room with learning element ${data?.learningElementId}`
      );

    this.calculateTotalRoomScoreUseCase.execute({
      roomId: learningRoom.id,
    });

    return Promise.resolve();
  }
}
