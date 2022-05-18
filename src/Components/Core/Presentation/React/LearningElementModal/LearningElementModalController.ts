import IScoreLearningElementUseCase from "../../../Application/ScoreLearningElement/IScoreLearningElementUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_SYMBOLS";
import { LearningComponentID } from "../../../Types/EnitityTypes";
import ILearningElementModalController from "./ILearningElementModalController";
import LearningElementModalViewModel from "./LearningElementModalViewModel";

export default class LearningElementModalController
  implements ILearningElementModalController
{
  constructor() {}
  async scoreLearningElement(
    learningElementId: LearningComponentID
  ): Promise<void> {
    await CoreDIContainer.get<IScoreLearningElementUseCase>(
      USECASE_TYPES.IScoreLearningElementUseCase
    ).executeAsync({
      learningElementId: learningElementId,
    });
  }
}
