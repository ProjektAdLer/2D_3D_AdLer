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

export default class AdaptivityElementPresenter
  implements IAdaptivityElementPresenter
{
  constructor(private viewModel: AdaptivityElementViewModel) {}

  onAdaptivityElementLoaded(contentTO: AdaptivityContentsTO): void {
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
      const questionAnswers = question.questionAnswers.map((answer) => {
        const newAnswer = {
          answerIndex: answer.answerIndex,
          answerText: answer.answerText,
          isSelected: false,
        } as AdaptivityAnswer;

        return newAnswer;
      });

      const newQuestion = {
        questionID: question.questionID,
        questionText: question.questionText,
        questionPoints: question.questionPoints,
        questionAnswers: questionAnswers,
      } as AdaptivityQuestion;

      tasks[0].questions.push(newQuestion);
    });

    // TODO: remove this placeholder data when TO is updated
    this.viewModel.contentData.Value = {
      elementName: "PLACEHOLDER_NAME",
      introText: "PLACEHOLDER_INTRO_TEXT",
      tasks: tasks,
    } as AdaptivityElementContent;

    this.viewModel.currentElement.Value =
      this.viewModel.contentData.Value.tasks[0].questions[0];
      */

    this.viewModel.isOpen.Value = true;
  }

  onAdaptivityElementSubmitted(evaluationTO: EvaluationAnswerTO): void {
    this.viewModel.evaluation.Value = evaluationTO.evaluation;
  }
}
