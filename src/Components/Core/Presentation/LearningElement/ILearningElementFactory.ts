import ILearningElementPresenter from "./ILearningElementPresenter";
import { LearningElementTypes } from "./Types/LearningElementTypes";

export default interface ILearningElementFactory {
  /**
   * Creates a new learning element of given type
   * @param type The type of the learning element
   * @return The presenter of the new learning element
   */
  createLearningElementAsync(
    type: LearningElementTypes
  ): Promise<ILearningElementPresenter>;
}
