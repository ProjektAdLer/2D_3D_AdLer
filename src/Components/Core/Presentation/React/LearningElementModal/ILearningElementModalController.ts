import { LearningComponentID } from "../../../Domain/Types/EntityTypes";
export default interface ILearningElementModalController {
  scoreLearningElement(learningElementId: LearningComponentID): Promise<void>;
}
