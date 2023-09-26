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
    viewModel.currentTaskID.subscribe(() => this.createFooterBreadcrumbs());
    viewModel.currentQuestionID.subscribe(() => this.createFooterBreadcrumbs());
    viewModel.contentData.subscribe(() => this.createFooterBreadcrumbs());
  }

  onAdaptivityElementLoaded?(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): void {
    this.viewModel.contentData.Value = this.createContentData(
      adaptivityElementProgressTO
    );
    this.viewModel.footerText.Value = this.createFooterBreadcrumbs();

    this.viewModel.isOpen.Value = true;
  }

  onAdaptivityElementSubmitted(evaluationTO: EvaluationAnswerTO): void {
    this.viewModel.evaluation.Value = evaluationTO.evaluation;
  }

  @bind
  private createFooterBreadcrumbs(): string {
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

    return newFooterText;
  }

  private createContentData(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): AdaptivityElementContent {
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
              task.requieredDifficulty <= question.questionDifficulty;

            return {
              questionID: question.questionId,
              questionText: question.questionText,
              questionAnswers: newAnswers,
              isRequired: isRequired,
              isCompleted: question.isCompleted,
            } as AdaptivityQuestion;
          }
        );

        return {
          taskID: task.taskId,
          taskTitle: task.taskTitle,
          questions: newQuestions,
          isCompleted: task.isCompleted,
        } as AdaptivityTask;
      }
    );

    // TODO: add element name when it is available
    return {
      elementName: "PLACEHOLDER_NAME",
      introText: adaptivityElementProgressTO.introText,
      tasks: newTasks,
    } as AdaptivityElementContent;
  }
}
