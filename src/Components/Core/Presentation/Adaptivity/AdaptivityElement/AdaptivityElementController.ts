import IAdaptivityElementController from "./IAdaptivityElementController";
import AdaptivityElementViewModel from "./AdaptivityElementViewModel";
import { SubmittedAnswersTO } from "../../../Application/DataTransferObjects/QuizElementTO";
import bind from "bind-decorator";

export default class AdaptivityElementController
  implements IAdaptivityElementController
{
  constructor(private viewModel: AdaptivityElementViewModel) {}

  @bind
  closeModal(): void {
    this.viewModel.isOpen.Value = false;
    console.log("close modal", this.viewModel.isOpen.Value);
  }

  @bind
  selectTask(taskID: number): void {
    this.viewModel.currentTaskID.Value = taskID;
    console.log("select task", this.viewModel.currentTaskID.Value);
  }

  @bind
  selectDifficulty(difficulty: number): void {
    this.viewModel.currentQuestionID.Value = difficulty;
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

    // CoreDIContainer.get<ISubmitAdaptivityElementSelectionUseCase>(
    //   USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase
    // ).executeAsync(selection);
  }
}
