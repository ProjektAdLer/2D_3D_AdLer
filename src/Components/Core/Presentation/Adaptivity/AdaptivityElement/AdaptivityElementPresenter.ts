import {
  AdaptivityContentsTO,
  EvaluationAnswerTO,
} from "../../../Application/DataTransferObjects/QuizElementTO";
import IAdaptivityElementPresenter from "./IAdaptivityElementPresenter";
import AdaptivityElementViewModel, {
  AdaptivityContent,
  AdaptivityQuestion,
  QuizAnswer,
} from "./AdaptivityElementViewModel";

export default class AdaptivityElementPresenter
  implements IAdaptivityElementPresenter
{
  constructor(private viewModel: AdaptivityElementViewModel) {}

  onAdaptivityElementLoaded(contentTO: AdaptivityContentsTO): void {
    const content = new AdaptivityContent();
    content.questions = [];

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
  }

  onAdaptivityElementSubmitted(evaluationTO: EvaluationAnswerTO): void {
    this.viewModel.evaluation.Value = evaluationTO.evaluation;
  }
}
