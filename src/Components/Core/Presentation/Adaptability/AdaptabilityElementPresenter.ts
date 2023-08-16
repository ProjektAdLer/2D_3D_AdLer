import IAdaptabilityElementPresenter from "./IAdaptabilityElementPresenter";
import LearningElementTO from "../../Application/DataTransferObjects/LearningElementTO";
import AdaptabilityElementViewModel from "./AdaptabilityElementViewModel";
import QuizElementTO from "../../Application/DataTransferObjects/QuizElementTO";

export default class AdaptabilityElementPresenter
  implements IAdaptabilityElementPresenter
{
  constructor(private viewModel: AdaptabilityElementViewModel) {}

  onLearningElementLoaded(elementTO: LearningElementTO): void {
    this.viewModel.filePath.Value = elementTO.filePath ?? "";
  }

  onAdaptabilityElementLoaded(question: QuizElementTO): void {
    this.viewModel.currentElement.Value = question;
  }
}
