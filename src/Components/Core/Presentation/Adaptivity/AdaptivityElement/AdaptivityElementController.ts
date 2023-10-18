import IAdaptivityElementController from "./IAdaptivityElementController";
import AdaptivityElementViewModel from "./AdaptivityElementViewModel";
import bind from "bind-decorator";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ISubmitAdaptivityElementSelectionUseCase from "src/Components/Core/Application/UseCases/Adaptivity/SubmitAdaptivityElementSelectionUseCase/ISubmitAdaptivityElementSelectionUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import AdaptivityElementQuestionSubmissionTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";

export default class AdaptivityElementController
  implements IAdaptivityElementController
{
  constructor(private viewModel: AdaptivityElementViewModel) {}

  @bind
  closeModal(): void {
    this.viewModel.isOpen.Value = false;
  }

  @bind
  selectTask(taskID: number): void {
    this.viewModel.currentTaskID.Value = taskID;
  }

  @bind
  selectQuestion(questionID: number): void {
    this.viewModel.currentQuestionID.Value = questionID;
  }

  @bind
  selectHint(questionID: number, hintID: number): void {
    this.viewModel.currentQuestionID.Value = questionID;
    this.viewModel.selectedHintID.Value = hintID;
  }

  @bind
  async submitSelection(selectedAnswers: number[]): Promise<void> {
    const submission: AdaptivityElementQuestionSubmissionTO = {
      elementID: this.viewModel.elementID.Value,
      taskID: this.viewModel.currentTaskID.Value!,
      questionID: this.viewModel.currentQuestionID.Value!,
      selectedAnswerIDs: selectedAnswers,
    };

    await CoreDIContainer.get<ISubmitAdaptivityElementSelectionUseCase>(
      USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase
    ).executeAsync(submission);
  }

  @bind
  closeFeedback(): void {
    this.viewModel.showFeedback.Value = false;
    this.viewModel.currentQuestionID.Value = null;
  }

  @bind
  closeAnswerSelection(): void {
    this.viewModel.currentQuestionID.Value = null;
  }

  @bind
  back(): void {
    if (this.viewModel.currentQuestionID.Value === null) {
      this.viewModel.currentTaskID.Value = null;
    }
    this.viewModel.currentQuestionID.Value = null;
    this.viewModel.showFeedback.Value = false;
    this.viewModel.selectedHintID.Value = null;
  }
}
