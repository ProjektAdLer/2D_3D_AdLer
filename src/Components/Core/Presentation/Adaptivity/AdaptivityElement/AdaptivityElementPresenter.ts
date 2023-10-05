import IAdaptivityElementPresenter from "./IAdaptivityElementPresenter";
import AdaptivityElementViewModel, {
  AdaptivityElementContent,
  AdaptivityQuestion,
  AdaptivityTask,
  AdaptivityAnswer,
} from "./AdaptivityElementViewModel";
import AdaptivityElementProgressTO from "../../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import bind from "bind-decorator";
import { AdaptivityElementQuestionDifficultyTypes } from "../../../Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import AdaptivityElementProgressUpdateTO from "../../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";

export default class AdaptivityElementPresenter
  implements IAdaptivityElementPresenter
{
  constructor(private viewModel: AdaptivityElementViewModel) {
    viewModel.currentTaskID.subscribe(() => this.setFooterBreadcrumbs());
    viewModel.currentQuestionID.subscribe(() => this.setFooterBreadcrumbs());
    viewModel.contentData.subscribe(() => this.setFooterBreadcrumbs());
  }

  onAdaptivityElementLoaded(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): void {
    this.setContentData(adaptivityElementProgressTO);
    this.setFooterBreadcrumbs();

    this.viewModel.currentTaskID.Value = null;
    this.viewModel.currentQuestionID.Value = null;

    this.viewModel.isOpen.Value = true;
  }

  onAdaptivityElementAnswerEvaluated(
    adaptivityElementProgressUpdateTO: AdaptivityElementProgressUpdateTO
  ): void {
    // this.viewModel.evaluation.Value = evaluationTO.evaluation;
  }

  @bind
  private setFooterBreadcrumbs(): void {
    const currentQuestionID = this.viewModel.currentQuestionID.Value;
    const currentTaskID = this.viewModel.currentTaskID.Value;
    const contentData = this.viewModel.contentData.Value;

    let newFooterText = contentData.elementName;

    if (currentTaskID !== null) {
      const currentTask = contentData.tasks.find(
        (task) => task.taskID === currentTaskID
      );
      newFooterText += " => " + currentTask!.taskTitle;

      if (currentQuestionID !== null) {
        const currentQuestion = currentTask!.questions.find(
          (question) => question.questionID === currentQuestionID
        );
        if (
          currentQuestion!.difficulty ===
          AdaptivityElementQuestionDifficultyTypes.easy
        )
          newFooterText += " => Leichte Frage";
        else if (
          currentQuestion!.difficulty ===
          AdaptivityElementQuestionDifficultyTypes.medium
        )
          newFooterText += " => Mittlere Frage";
        else if (
          currentQuestion!.difficulty ===
          AdaptivityElementQuestionDifficultyTypes.hard
        )
          newFooterText += " => Schwere Frage";
      }
    }

    this.viewModel.footerText.Value = newFooterText;
  }

  private setContentData(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): void {
    const newTasks: AdaptivityTask[] = adaptivityElementProgressTO.tasks.map(
      (task) => {
        const newQuestions: AdaptivityQuestion[] = task.questions.map(
          (question) => {
            const newAnswers: AdaptivityAnswer[] = question.questionAnswers.map(
              (answer) => {
                return {
                  answerIndex: answer.answerId,
                  answerText: answer.answerText,
                  isSelected: false,
                } as AdaptivityAnswer;
              }
            );

            // TODO: this is not completely correct yet
            const isRequired =
              task.requiredDifficulty <= question.questionDifficulty;

            // TODO: update this check with enum type
            const isMultipleChoice =
              question.questionType === "multipleResponse";

            return {
              questionID: question.questionId,
              questionText: question.questionText,
              questionAnswers: newAnswers,
              isRequired: isRequired,
              isCompleted: question.isCompleted,
              difficulty: question.questionDifficulty,
              isMultipleChoice: isMultipleChoice,
            } as AdaptivityQuestion;
          }
        );

        return {
          taskID: task.taskId,
          taskTitle: task.taskTitle,
          questions: newQuestions,
          isCompleted: task.isCompleted,
          requiredDifficulty: task.requiredDifficulty,
        } as AdaptivityTask;
      }
    );

    // TODO: add element name when it is available
    this.viewModel.contentData.Value = {
      elementName: adaptivityElementProgressTO.elementName,
      introText: adaptivityElementProgressTO.introText,
      tasks: newTasks,
    } as AdaptivityElementContent;
  }
}
