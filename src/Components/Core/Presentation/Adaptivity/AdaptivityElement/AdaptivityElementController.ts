import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IAdaptivityElementController from "./IAdaptivityElementController";
import ILoadQuizElementUseCase from "../../../Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/ILoadAdaptivityElementUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import AdaptivityElementViewModel from "./AdaptivityElementViewModel";
import { SubmittedAnswersTO } from "../../../Application/DataTransferObjects/QuizElementTO";
import ISubmitAdaptivityElementSelectionUseCase from "../../../Application/UseCases/Adaptivity/SubmitAdaptivityElementSelectionUseCase/ISubmitAdaptivityElementSelectionUseCase";

export default class AdaptivityElementController
  implements IAdaptivityElementController
{
  constructor(private viewModel: AdaptivityElementViewModel) {}

  loadAdaptivityElement(): void {
    CoreDIContainer.get<ILoadQuizElementUseCase>(
      USECASE_TYPES.ILoadAdaptivityElementUseCase
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

    CoreDIContainer.get<ISubmitAdaptivityElementSelectionUseCase>(
      USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase
    ).executeAsync(selection);
  }
}
