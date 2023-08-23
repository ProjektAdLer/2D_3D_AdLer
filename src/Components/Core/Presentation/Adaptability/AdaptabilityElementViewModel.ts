import LearningElementModalViewModel from "~ReactComponents/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import Observable from "src/Lib/Observable";
import QuizElementTO from "../../Application/DataTransferObjects/QuizElementTO";

// maybe inherit from LearningElementModalViewModel?
export default class AdaptabilityElementViewModel {
  constructor() {}

  isFinished: Observable<boolean> = new Observable<boolean>(false);
  currentElement: Observable<QuizElementTO> = new Observable<QuizElementTO>();
  filePath = new Observable<string>();
}
