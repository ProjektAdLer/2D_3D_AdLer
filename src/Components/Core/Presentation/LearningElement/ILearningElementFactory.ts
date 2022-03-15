import ILearningElementPresenter from "./ILearningElementPresenter";
import { LearningElementTypes } from "./Types/LearningElementTypes";

export default interface ILearningElementFactory {
  createLearningElementAsync(
    type: LearningElementTypes
  ): Promise<ILearningElementPresenter>;
}
