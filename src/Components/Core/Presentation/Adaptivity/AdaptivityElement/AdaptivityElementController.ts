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
    console.log("close modal", this.viewModel.isOpen.Value);
  }

  @bind
  selectTask(taskID: number): void {
    this.viewModel.currentTaskID.Value = taskID;
    console.log("select task", this.viewModel.currentTaskID.Value);
  }

  @bind
  selectQuestion(selectedQuestionID: number): void {
    this.viewModel.currentQuestionID.Value = selectedQuestionID;
  }

  @bind
  async submitSelection(): Promise<void> {
    // to test backend response of submit usecase
    const testsubmission: AdaptivityElementQuestionSubmissionTO = {
      worldID: 0,
      elementID: 0,
      taskID: this.viewModel.currentTaskID.Value!,
      questionID: this.viewModel.currentQuestionID.Value!,
      selectedAnswerIDs: [],
    };

    await CoreDIContainer.get<ISubmitAdaptivityElementSelectionUseCase>(
      USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase
    ).executeAsync(testsubmission);

    // TODO: remove this debug code
    this.viewModel.showFeedback.Value = true;
    this.viewModel.contentData.Value.tasks
      .find((task) => task.taskID === this.viewModel.currentTaskID.Value)!
      .questions.find(
        (question) =>
          question.questionID === this.viewModel.currentQuestionID.Value
      )!.isCompleted = true;
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
  }
}
