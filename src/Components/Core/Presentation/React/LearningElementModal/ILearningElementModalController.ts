import { LearningComponentID } from "./../../../Types/EnitityTypes";
export default interface ILearningElementModalController {
  scoreLearningElement(learningElementId: LearningComponentID): Promise<void>;
}
