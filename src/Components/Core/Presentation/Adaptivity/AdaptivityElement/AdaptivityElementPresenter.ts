import { EvaluationAnswerTO } from "../../../Application/DataTransferObjects/QuizElementTO";
import IAdaptivityElementPresenter from "./IAdaptivityElementPresenter";
import AdaptivityElementViewModel, {
  AdaptivityElementContent,
  AdaptivityQuestion,
  AdaptivityTask,
  AdaptivityAnswer,
} from "./AdaptivityElementViewModel";
import AdaptivityElementProgressTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import bind from "bind-decorator";

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

  onAdaptivityElementSubmitted(evaluationTO: EvaluationAnswerTO): void {
    this.viewModel.evaluation.Value = evaluationTO.evaluation;
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
        // TODO: create question title from difficulty
        // newFooterText += " => " currentQuestion!.;
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

            return {
              questionID: question.questionId,
              questionText: question.questionText,
              questionAnswers: newAnswers,
              isRequired: isRequired,
              isCompleted: question.isCompleted,
              difficulty: question.questionDifficulty,
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
