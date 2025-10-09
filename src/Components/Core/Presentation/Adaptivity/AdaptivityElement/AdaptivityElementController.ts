import ILearningWorldCompletionModalPresenter from "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/ILearningWorldCompletionModalPresenter";
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
import ILoadExternalLearningElementUseCase from "src/Components/Core/Application/UseCases/Adaptivity/LoadExternalLearningElementUseCase/ILoadExternalLearningElementUseCase";
import type { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import IDisplayAdaptivityHintLearningElementUseCase from "src/Components/Core/Application/UseCases/Adaptivity/DisplayAdaptivityHintLearningElement/IDisplayAdaptivityHintLearningElementUseCase";
import i18next from "i18next";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IBeginStoryElementOutroCutSceneUseCase from "src/Components/Core/Application/UseCases/BeginStoryElementOutroCutScene/IBeginStoryElementOutroCutSceneUseCase";

export default class AdaptivityElementController
  implements IAdaptivityElementController
{
  private bottomToolTipPresenter: IBottomTooltipPresenter;
  private beginStoryElementOutroCutSceneUseCase: IBeginStoryElementOutroCutSceneUseCase;

  constructor(private viewModel: AdaptivityElementViewModel) {
    this.bottomToolTipPresenter = CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    );
    this.beginStoryElementOutroCutSceneUseCase =
      CoreDIContainer.get<IBeginStoryElementOutroCutSceneUseCase>(
        USECASE_TYPES.IBeginStoryElementOutroCutSceneUseCase,
      );
  }

  @bind
  closeModal(): void {
    this.viewModel.isOpen.Value = false;
    this.viewModel.currentTask.Value = null;
    this.viewModel.currentQuestion.Value = null;
    this.viewModel.showFeedback.Value = false;
    this.viewModel.selectedHint.Value = null;
    this.showBottomToolTip();
    this.setModalVisibility(false);
    // trigger cutscene
    this.beginStoryElementOutroCutSceneUseCase.execute({
      scoredLearningElementID: this.viewModel.elementID.Value,
    });
  }

  @bind
  selectTask(selectedTask: AdaptivityTask): void {
    this.viewModel.currentTask.Value = selectedTask;
  }

  @bind
  selectQuestion(selectedQuestion: AdaptivityQuestion): void {
    this.viewModel.currentQuestion.Value = selectedQuestion;
    this.viewModel.currentQuestion.Value.questionAnswers.forEach((answer) => {
      answer.isSelected = false;
    });
  }

  @bind
  async selectHint(
    selectedHint: AdaptivityHint,
    associatedQuestion: AdaptivityQuestion,
  ): Promise<void> {
    this.viewModel.currentQuestion.Value = associatedQuestion;

    if (
      selectedHint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ReferenceAction &&
      selectedHint.hintAction.idData !== undefined
    ) {
      await CoreDIContainer.get<IDisplayAdaptivityHintLearningElementUseCase>(
        USECASE_TYPES.IDisplayAdaptivityHintLearningElementUseCase,
      ).executeAsync(selectedHint.hintAction.idData);
    } else if (
      selectedHint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ContentAction &&
      selectedHint.hintAction.idData !== undefined
    ) {
      this.loadExternalContentReference(
        selectedHint.hintAction.idData,
        associatedQuestion,
      );
    }
    // check if selected hint in vm was not set in usecase
    if (!this.viewModel.selectedHint.Value) {
      this.viewModel.selectedHint.Value = selectedHint;
    }
  }

  @bind
  async submitSelection(): Promise<void> {
    const selectedAnswers =
      this.viewModel.currentQuestion.Value!.questionAnswers.map((answer) => {
        return answer.isSelected;
      });

    const submission: AdaptivityElementQuestionSubmissionTO = {
      elementID: this.viewModel.elementID.Value,
      taskID: this.viewModel.currentTask.Value!.taskID,
      questionID: this.viewModel.currentQuestion.Value!.questionID,
      selectedAnswers: selectedAnswers,
    };

    await CoreDIContainer.get<ISubmitAdaptivityElementSelectionUseCase>(
      USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase,
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
  closeHint(): void {
    this.viewModel.selectedHint.Value = null;
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
    if (this.viewModel.showFooterTooltip.Value) {
      this.viewModel.showFooterTooltip.Value = false;
    } else {
      this.viewModel.showFooterTooltip.Value = true;
    }
  }

  @bind
  hideFooterTooltip(): void {
    this.viewModel.showFooterTooltip.Value = false;
  }

  @bind
  reset(): void {
    this.viewModel.currentTask.Value = null;
    this.viewModel.currentQuestion.Value = null;
    this.viewModel.contentData.Value.tasks.forEach((task) => {
      task.isCompleted = null;
      task.hasBeenCompleted = false;
      task.questions.forEach((question) => {
        question.isCompleted = null;
        question.questionAnswers.forEach((answer) => {
          answer.isCorrect = undefined;
        });
      });
    });
    this.viewModel.hasResetted.Value = !this.viewModel.hasResetted.Value;
  }

  @bind
  async loadExternalContentReference(
    elementID: ComponentID,
    associatedQuestion: AdaptivityQuestion,
  ): Promise<void> {
    this.viewModel.selectedHint.Value = null;
    //TODO: filter out hints in LoadLearningWorldUseCase that reference invalid
    //learningelement or external elements to avoid error handling here
    try {
      await CoreDIContainer.get<ILoadExternalLearningElementUseCase>(
        USECASE_TYPES.ILoadExternalLearningElementUseCase,
      ).executeAsync(elementID);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes(`Could not find element with ID`)) {
          this.viewModel.selectedHint.Value = {
            hintID: -1,
            showOnIsWrong: true,
            hintAction: {
              hintActionType: AdaptivityElementActionTypes.CommentAction,
              textData: i18next.t("noHint", { ns: "learningElement" }),
            },
          } as AdaptivityHint;
          this.viewModel.currentQuestion.Value = associatedQuestion;
        } else if (
          error.message.includes(`Found more than one element with ID`)
        ) {
          this.viewModel.selectedHint.Value = {
            hintID: -1,
            showOnIsWrong: true,
            hintAction: {
              hintActionType: AdaptivityElementActionTypes.CommentAction,
              textData: i18next.t("tooManyHints", { ns: "learningElement" }),
            },
          } as AdaptivityHint;
          this.viewModel.currentQuestion.Value = associatedQuestion;
        }
      }
    }
  }

  @bind
  setModalVisibility(isOpen: boolean): void {
    // presenter must be set in method to avoid race condition of which component will be constructed first (adaptivitiyelement or learningworldcompletionmodal)
    const presenter =
      CoreDIContainer.get<ILearningWorldCompletionModalPresenter>(
        PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
      );
    presenter.onModalVisibility(isOpen);
  }

  private showBottomToolTip(): void {
    this.bottomToolTipPresenter.show();
  }
}
