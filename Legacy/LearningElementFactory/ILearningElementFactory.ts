import ILearningElementController from "../../src/Components/Core/Presentation/LearningElement/ILearningElementController";
import { LearningElementType } from "../../src/Components/Core/Presentation/LearningElement/Types/LearningElementTypes";

export default interface ILearningElementFactory {
  /**
   * Creates a new learning element of given type
   * @param type The type of the learning element
   * @return The presenter of the new learning element
   */
  createLearningElementAsync(
    type: LearningElementType
  ): Promise<ILearningElementController>;
}
