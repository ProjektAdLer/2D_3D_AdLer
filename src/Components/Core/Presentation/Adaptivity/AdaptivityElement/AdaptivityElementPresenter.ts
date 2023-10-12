import { AdaptivityElementQuestionTypes } from "./../../../Domain/Types/Adaptivity/AdaptivityElementQuestionTypes";
import IAdaptivityElementPresenter from "./IAdaptivityElementPresenter";
import AdaptivityElementViewModel, {
  AdaptivityElementContent,
  AdaptivityQuestion,
  AdaptivityTask,
  AdaptivityAnswer,
  AdaptivityHint,
  AdaptivityHintAction,
} from "./AdaptivityElementViewModel";
import AdaptivityElementProgressTO from "../../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import bind from "bind-decorator";
import { AdaptivityElementQuestionDifficultyTypes } from "../../../Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import AdaptivityElementProgressUpdateTO from "../../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";
import { AdaptivityElementStatusTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementStatusTypes";
import AdaptivityElementTaskProgressTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementTaskProgressTO";
import AdaptivityElementQuestionProgressTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionProgressTO";
import AdaptivityElementAnswersTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementAnswerTO";
import AdaptivityElementTriggerTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementTriggerTO";
import { AdaptivityElementTriggerConditionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementTriggerConditionTypes";

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
    const updatedTask = this.viewModel.contentData.Value.tasks.find(
      (task) =>
        task.taskID === adaptivityElementProgressUpdateTO.taskInfo.taskId
    )!;

    if (
      adaptivityElementProgressUpdateTO.taskInfo.taskStatus ===
      AdaptivityElementStatusTypes.Correct
    )
      updatedTask.isCompleted = true;
    else if (
      adaptivityElementProgressUpdateTO.taskInfo.taskStatus ===
      AdaptivityElementStatusTypes.Incorrect
    )
      updatedTask.isCompleted = false;
    else updatedTask.isCompleted = null;

    const updatedQuestion = updatedTask.questions.find(
      (question) =>
        question.questionID ===
        adaptivityElementProgressUpdateTO.questionInfo.questionId
    )!;

    if (
      adaptivityElementProgressUpdateTO.questionInfo.questionStatus ===
      AdaptivityElementStatusTypes.Correct
    )
      updatedQuestion.isCompleted = true;
    else if (
      adaptivityElementProgressUpdateTO.questionInfo.questionStatus ===
      AdaptivityElementStatusTypes.Incorrect
    )
      updatedQuestion.isCompleted = false;
    else updatedQuestion.isCompleted = null;

    updatedQuestion.questionAnswers.forEach((answer) => {
      answer.isSelected = false;
    });

    this.viewModel.showFeedback.Value = true;
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
    const newTasks: AdaptivityTask[] = this.mapTasks(
      adaptivityElementProgressTO.tasks
    );

    this.viewModel.contentData.Value = {
      elementName: adaptivityElementProgressTO.elementName,
      introText: adaptivityElementProgressTO.introText,
      tasks: newTasks,
    } as AdaptivityElementContent;
  }

  private mapTasks(tasks: AdaptivityElementTaskProgressTO[]): AdaptivityTask[] {
    return tasks.map((task) => {
      return {
        taskID: task.taskId,
        taskTitle: task.taskTitle,
        questions: this.mapQuestions(task.questions, task.requiredDifficulty),
        isCompleted: task.isCompleted,
        requiredDifficulty: task.requiredDifficulty,
      } as AdaptivityTask;
    });
  }

  private mapQuestions(
    questions: AdaptivityElementQuestionProgressTO[],
    requiredDifficulty: AdaptivityElementQuestionDifficultyTypes
  ): AdaptivityQuestion[] {
    return questions.map((question) => {
      // TODO: this is not completely correct yet
      // What happens if the required difficulty is something like 86?
      const isRequired = requiredDifficulty === question.questionDifficulty;

      const isMultipleChoice =
        question.questionType ===
        AdaptivityElementQuestionTypes.multipleResponse;

      return {
        questionID: question.questionId,
        questionText: question.questionText,
        questionAnswers: this.mapAnswers(question.questionAnswers),
        isRequired: isRequired,
        isCompleted: question.isCompleted,
        difficulty: question.questionDifficulty,
        isMultipleChoice: isMultipleChoice,
        hints: this.mapAdaptivityTriggers(question.triggers),
      } as AdaptivityQuestion;
    });
  }

  private mapAnswers(
    answers: AdaptivityElementAnswersTO[]
  ): AdaptivityAnswer[] {
    return answers.map((answer) => {
      return {
        answerIndex: answer.answerId,
        answerText: answer.answerText,
        isSelected: false,
      } as AdaptivityAnswer;
    });
  }

  private mapAdaptivityTriggers(
    triggers: AdaptivityElementTriggerTO[]
  ): AdaptivityHint[] {
    if (!triggers) return [];

    return triggers.map((trigger) => {
      return {
        hintID: trigger.triggerId,
        showOnIsWrong:
          trigger.triggerCondition ===
          AdaptivityElementTriggerConditionTypes.incorrect,
        hintAction: {
          hintActionType: trigger.triggerAction.actionType,
          hintActionData: trigger.triggerAction.actionData,
        } as AdaptivityHintAction,
      } as AdaptivityHint;
    });
  }
}
