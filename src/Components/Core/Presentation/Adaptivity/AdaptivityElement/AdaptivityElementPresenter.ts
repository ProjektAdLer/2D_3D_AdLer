import {
  AdaptivityContentsTO,
  EvaluationAnswerTO,
} from "../../../Application/DataTransferObjects/QuizElementTO";
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
    viewModel.currentElement.subscribe(() => this.createFooterBreadcrumbs());
    viewModel.contentData.subscribe(() => this.createFooterBreadcrumbs());
  }

  onAdaptivityElementLoaded?(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): void {
    /*
    // TODO: remove this placeholder data when TO is updated
    const tasks: AdaptivityTask[] = [
      {
        taskID: 1,
        taskTitle: "PLACEHOLDER_TASK_TITLE",
        questions: [],
      } as AdaptivityTask,
    ];

    contentTO.questions.forEach((question) => {
      const questionTarget = new AdaptivityQuestion();
      questionTarget.questionAnswers = [];

      questionTarget.questionID = question.questionID;
      questionTarget.questionText = question.questionText;
      if (questionTarget.questionImage && question.questionImage)
        questionTarget.questionImage = question.questionImage;
      questionTarget.questionPoints = question.questionPoints;
      question.questionAnswers.forEach((answer) => {
        const answerTarget = new QuizAnswer();
        answerTarget.answerIndex = answer.answerIndex;
        answerTarget.answerText = answer.answerText;
        if (answerTarget.answerImage && answer.answerImage)
          answerTarget.answerImage = answer.answerImage;
        answerTarget.isSelected = false;
        questionTarget.questionAnswers.push(answerTarget);
      });

      content.questions.push(questionTarget);
    });

    this.viewModel.contentData.Value = content;

    //this.viewModel.contentData.Value = contentTO;
    this.viewModel.currentElement.Value =
      this.viewModel.contentData.Value.questions[0];
      */

    this.createFooterBreadcrumbs();

    this.viewModel.isOpen.Value = true;
  }

  onAdaptivityElementSubmitted(evaluationTO: EvaluationAnswerTO): void {
    this.viewModel.evaluation.Value = evaluationTO.evaluation;
  }

  @bind
  private createFooterBreadcrumbs(): void {
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
}
