import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IAdaptabilityElementController from "./IAdaptabilityElementController";
import ILoadQuizElementUseCase from "../../Application/UseCases/Adaptability/LoadQuizElementUseCase/ILoadQuizElementUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IUpdateQuizElementUseCase from "../../Application/UseCases/Adaptability/UpdateQuizElementUseCase/IUpdateQuizElementUseCase";
import AdaptabilityElementViewModel from "./AdaptabilityElementViewModel";
import { SubmittedAnswersTO } from "../../Application/DataTransferObjects/QuizElementTO";
import ISubmitSelectionUseCase from "../../Application/UseCases/Adaptability/SubmitSelectionUseCase/ISubmitSelectionUseCase";

export default class AdaptabilityElementController
  implements IAdaptabilityElementController
{
  constructor(private viewModel: AdaptabilityElementViewModel) {}

  loadAdaptivityElement(): void {
    CoreDIContainer.get<ILoadQuizElementUseCase>(
      USECASE_TYPES.ILoadQuizElementUseCase
    ).executeAsync();
  }

  submitSelection(): void {
    let selection = new SubmittedAnswersTO();
    selection.questionID = this.viewModel.currentElement.Value.questionID;
    selection.allAnswerIndexes = [];
    selection.allAnswerIndexes =
      this.viewModel.currentElement.Value.questionAnswers.map((element) => {
        return element.answerIndex;
      });
    selection.selectedAnswerIndexes = [];
    this.viewModel.currentElement.Value.questionAnswers.forEach((element) => {
      if (element.isSelected) {
        selection.selectedAnswerIndexes.push(element.answerIndex);
      }
    });

    CoreDIContainer.get<ISubmitSelectionUseCase>(
      USECASE_TYPES.ISubmitSelectionUseCase
    ).executeAsync(selection);
  }

  updateAdaptabilityElementDisplay(): void {
    CoreDIContainer.get<IUpdateQuizElementUseCase>(
      USECASE_TYPES.IUpdateQuizElementUseCase
    ).executeAsync();
  }
}
