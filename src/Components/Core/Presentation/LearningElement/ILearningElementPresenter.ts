import { LearningElementTO } from "../../Application/LoadWorld/ILearningWorldPort";
import LearningElementViewModel from "./LearningElementViewModel";

export default interface ILearningElementPresenter {
  set ViewModel(newViewModel: LearningElementViewModel);

  presentLearningElement(learningElementTO: LearningElementTO): void;
}
