import IAdaptivityElementController from "./IAdaptivityElementController";
import AdaptivityElementViewModel from "./AdaptivityElementViewModel";
import type {
  AdaptivityHint,
  AdaptivityQuestion,
  AdaptivityTask,
} from "./AdaptivityElementViewModel";
import bind from "bind-decorator";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ISubmitAdaptivityElementSelectionUseCase from "../../../Application/UseCases/Adaptivity/SubmitAdaptivityElementSelectionUseCase/ISubmitAdaptivityElementSelectionUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import AdaptivityElementQuestionSubmissionTO from "../../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import { AdaptivityElementActionTypes } from "../../../Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../Application/Ports/Interfaces/ILearningWorldPort";

export default class AdaptivityElementController
  implements IAdaptivityElementController
{
  constructor(private viewModel: AdaptivityElementViewModel) {}

  @bind
  closeModal(): void {
    this.viewModel.isOpen.Value = false;
  }

  @bind
  selectTask(selectedTask: AdaptivityTask): void {
    this.viewModel.currentTask.Value = selectedTask;
  }

  @bind
  selectQuestion(selectedQuestion: AdaptivityQuestion): void {
    this.viewModel.currentQuestion.Value = selectedQuestion;
  }

  @bind
  selectHint(
    selectedHint: AdaptivityHint,
    associatedQuestion: AdaptivityQuestion
  ): void {
    if (
      selectedHint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ReferenceAction &&
      typeof selectedHint.hintAction.hintActionData === "number"
    ) {
      // call all element presenters via port
      const learningWorldPort = CoreDIContainer.get<ILearningWorldPort>(
        PORT_TYPES.ILearningWorldPort
      );

      learningWorldPort.onLearningElementHighlighted(
        selectedHint.hintAction.hintActionData
      );
    }

    this.viewModel.currentQuestion.Value = associatedQuestion;
    this.viewModel.selectedHint.Value = selectedHint;
  }

  @bind
  async submitSelection(): Promise<void> {
    const selectedAnswerIDs = this.viewModel.currentQuestion
      .Value!.questionAnswers.filter((answer) => {
        return answer.isSelected;
      })
      .map((selectedAnswer) => {
        return selectedAnswer.answerIndex;
      });

    const submission: AdaptivityElementQuestionSubmissionTO = {
      elementID: this.viewModel.elementID.Value,
      taskID: this.viewModel.currentTask.Value!.taskID,
      questionID: this.viewModel.currentQuestion.Value!.questionID,
      selectedAnswerIDs: selectedAnswerIDs,
    };

    await CoreDIContainer.get<ISubmitAdaptivityElementSelectionUseCase>(
      USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase
    ).executeAsync(submission);
  }

  @bind
  closeFeedback(): void {
    this.viewModel.showFeedback.Value = false;
    this.viewModel.currentQuestion.Value = null;
  }

  @bind
  closeAnswerSelection(): void {
    this.viewModel.currentQuestion.Value = null;
  }

  @bind
  back(): void {
    if (this.viewModel.currentQuestion.Value === null) {
      this.viewModel.currentTask.Value = null;
    }
    this.viewModel.currentQuestion.Value = null;
    this.viewModel.showFeedback.Value = false;
    this.viewModel.selectedHint.Value = null;
  }

  @bind
  showFooterTooltip(): void {
    this.viewModel.showFooterTooltip.Value = true;
  }

  @bind
  hideFooterTooltip(): void {
    this.viewModel.showFooterTooltip.Value = false;
  }
}
