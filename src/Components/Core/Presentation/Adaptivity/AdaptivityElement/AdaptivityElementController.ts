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
import ILoadExternalLearningElementUseCase from "src/Components/Core/Application/UseCases/Adaptivity/LoadExternalLearningElementUseCase/ILoadExternalLearningElementUseCase";
import type { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import IDisplayAdaptivityHintLearningElementUseCase from "src/Components/Core/Application/UseCases/Adaptivity/DisplayAdaptivityHintLearningElement/IDisplayAdaptivityHintLearningElementUseCase";
import i18next from "i18next";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

export default class AdaptivityElementController
  implements IAdaptivityElementController
{
  private bottomToolTipPresenter: IBottomTooltipPresenter;

  constructor(private viewModel: AdaptivityElementViewModel) {
    this.bottomToolTipPresenter = CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    );
  }

  @bind
  closeModal(): void {
    this.viewModel.isOpen.Value = false;
    this.showBottomToolTip();
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
    associatedQuestion: AdaptivityQuestion
  ): Promise<void> {
    if (
      selectedHint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ReferenceAction &&
      selectedHint.hintAction.idData !== undefined
    ) {
      // if element is in same learning space then highlight,
      // if not in space nothing will happen
      // call all element presenters via port
      const learningWorldPort = CoreDIContainer.get<ILearningWorldPort>(
        PORT_TYPES.ILearningWorldPort
      );

      learningWorldPort.onLearningElementHighlighted(
        selectedHint.hintAction.idData
      );

      await CoreDIContainer.get<IDisplayAdaptivityHintLearningElementUseCase>(
        USECASE_TYPES.IDisplayAdaptivityHintLearningElementUseCase
      ).executeAsync(selectedHint.hintAction.idData);

      if (this.viewModel.selectedHint.Value) {
        this.viewModel.currentQuestion.Value = associatedQuestion;
      } else {
        this.viewModel.currentQuestion.Value = null;
      }
    } else if (
      selectedHint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ContentAction &&
      selectedHint.hintAction.idData !== undefined
    ) {
      this.loadExternalContentReference(
        selectedHint.hintAction.idData,
        associatedQuestion
      );
    } else {
      this.viewModel.currentQuestion.Value = associatedQuestion;
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

  @bind
  async loadExternalContentReference(
    elementID: ComponentID,
    associatedQuestion: AdaptivityQuestion
  ): Promise<void> {
    this.viewModel.selectedHint.Value = null;
    //TODO: filter out hints in LoadLearningWorldUseCase that reference invalid
    //learningelement or external elements to avoid error handling here
    try {
      await CoreDIContainer.get<ILoadExternalLearningElementUseCase>(
        USECASE_TYPES.ILoadExternalLearningElementUseCase
      ).executeAsync(elementID);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes(`Could not find element with ID`)) {
          this.viewModel.selectedHint.Value = {
            hintID: -1,
            showOnIsWrong: true,
            hintAction: {
              hintActionType: AdaptivityElementActionTypes.CommentAction,
              textData: i18next.t("noQuestion", { ns: "learningElement" }),
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

  private showBottomToolTip(): void {
    this.bottomToolTipPresenter.show();
  }
}
