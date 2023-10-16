import type { ComponentID } from "./../../../Domain/Types/EntityTypes";
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
  selectQuestion(selectedQuestionID: number): void {
    this.viewModel.currentQuestionID.Value = selectedQuestionID;
  }

  @bind
  async submitSelection(
    elementId: ComponentID,
    selectedAnswers: number[]
  ): Promise<void> {
    const submission: AdaptivityElementQuestionSubmissionTO = {
      elementID: elementId,
      taskID: this.viewModel.currentTaskID.Value!,
      questionID: this.viewModel.currentQuestionID.Value!,
      selectedAnswerIDs: selectedAnswers,
    };

    await CoreDIContainer.get<ISubmitAdaptivityElementSelectionUseCase>(
      USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase
    ).executeAsync(submission);

    // TODO: remove this debug code
    //this.viewModel.showFeedback.Value = true;
    // this.viewModel.contentData.Value.tasks
    //   .find((task) => task.taskID === this.viewModel.currentTaskID.Value)!
    //   .questions.find(
    //     (question) =>
    //       question.questionID === this.viewModel.currentQuestionID.Value
    //   )!.isCompleted = true;
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
  }
}
