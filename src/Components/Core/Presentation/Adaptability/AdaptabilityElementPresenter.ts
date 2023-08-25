import {
  AdaptivityContentsTO,
  EvaluationAnswerTO,
} from "./../../Application/DataTransferObjects/QuizElementTO";
import IAdaptabilityElementPresenter from "./IAdaptabilityElementPresenter";
import LearningElementTO from "../../Application/DataTransferObjects/LearningElementTO";
import AdaptabilityElementViewModel, {
  AdaptivityContent,
  AdaptivityQuestion,
  QuizAnswer,
} from "./AdaptabilityElementViewModel";

export default class AdaptabilityElementPresenter
  implements IAdaptabilityElementPresenter
{
  constructor(private viewModel: AdaptabilityElementViewModel) {}

  onAdaptivityElementLoaded(contentTO: AdaptivityContentsTO): void {
    const content = new AdaptivityContent();
    content.questions = new Array();

    contentTO.questions.forEach((question) => {
      const questionTarget = new AdaptivityQuestion();
      questionTarget.questionAnswers = new Array();

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
