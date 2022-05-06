import ILearningElementController from "./ILearningElementController";
import LearningElementViewModel from "./LearningElementViewModel";

export default interface ILearningElementView {
  set ViewModel(newViewModel: LearningElementViewModel);
  set Controller(newController: ILearningElementController);
}
