import {
  AdaptivityContentsTO,
  EvaluationAnswerTO,
} from "../../../Application/DataTransferObjects/QuizElementTO";
import IAdaptivityElementPresenter from "./IAdaptivityElementPresenter";
import AdaptivityElementViewModel, {
  AdaptivityElementContent,
  AdaptivityQuestion,
  AdaptivityTask,
  QuizAnswer,
} from "./AdaptivityElementViewModel";

export default class AdaptivityElementPresenter
  implements IAdaptivityElementPresenter
{
  constructor(private viewModel: AdaptivityElementViewModel) {}

  onAdaptivityElementLoaded(contentTO: AdaptivityContentsTO): void {
    const content = new AdaptivityElementContent();
    content.tasks = [new AdaptivityTask()];

    contentTO.questions.forEach((question) => {
      const questionTarget = new AdaptivityQuestion();

      questionTarget.questionID = question.questionID;
      questionTarget.questionText = question.questionText;
      questionTarget.questionPoints = question.questionPoints;

      questionTarget.questionAnswers = [];
      question.questionAnswers.forEach((answer) => {
        const answerTarget = new QuizAnswer();
        answerTarget.answerIndex = answer.answerIndex;
        answerTarget.answerText = answer.answerText;
        answerTarget.isSelected = false;
        questionTarget.questionAnswers.push(answerTarget);
      });

      content.tasks[0].questions.push(questionTarget);
    });

    this.viewModel.contentData.Value = content;

    //this.viewModel.contentData.Value = contentTO;
    this.viewModel.currentElement.Value =
      this.viewModel.contentData.Value.tasks[0].questions[0];

    this.viewModel.isOpen.Value = true;
  }

  onAdaptivityElementSubmitted(evaluationTO: EvaluationAnswerTO): void {
    this.viewModel.evaluation.Value = evaluationTO.evaluation;
  }
}
