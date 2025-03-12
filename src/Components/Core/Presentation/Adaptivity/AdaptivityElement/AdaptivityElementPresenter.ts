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
import AdaptivityElementAnswerTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementAnswerTO";
import AdaptivityElementTriggerTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementTriggerTO";
import { AdaptivityElementTriggerConditionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementTriggerConditionTypes";
import AdaptivityElementHintTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementHintTO";
import AdaptivityElementQuestionPresentationUpdateTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionPresentationUpdateTO";
import i18next from "i18next";

export default class AdaptivityElementPresenter
  implements IAdaptivityElementPresenter
{
  constructor(private viewModel: AdaptivityElementViewModel) {
    viewModel.currentTask.subscribe(() => this.setFooterBreadcrumbs());
    viewModel.currentQuestion.subscribe(() => this.setFooterBreadcrumbs());
    viewModel.contentData.subscribe(() => this.setFooterBreadcrumbs());
  }

  onAdaptivityElementLoaded(
    adaptivityElementProgressTO: AdaptivityElementProgressTO,
  ): void {
    this.setContentData(adaptivityElementProgressTO);
    this.setFooterBreadcrumbs();

    this.viewModel.elementID.Value = adaptivityElementProgressTO.id;
    this.viewModel.model.Value = adaptivityElementProgressTO.model;
    this.viewModel.currentTask.Value = null;
    this.viewModel.currentQuestion.Value = null;

    this.viewModel.isOpen.Value = true;
  }

  onAdaptivityElementAnswerEvaluated(
    adaptivityElementProgressUpdateTO: AdaptivityElementProgressUpdateTO,
  ): void {
    const updatedTask = this.viewModel.contentData.Value.tasks.find(
      (task) =>
        task.taskID === adaptivityElementProgressUpdateTO.taskInfo.taskId,
    )!;

    // update question status
    const questionStatus =
      adaptivityElementProgressUpdateTO.questionInfo.questionStatus;

    const updatedQuestion = updatedTask.questions.find(
      (question) =>
        question.questionID ===
        adaptivityElementProgressUpdateTO.questionInfo.questionId,
    )!;

    if (questionStatus === AdaptivityElementStatusTypes.Correct)
      updatedQuestion.isCompleted = true;
    else if (questionStatus === AdaptivityElementStatusTypes.Incorrect)
      updatedQuestion.isCompleted = false;
    else updatedQuestion.isCompleted = null;

    updatedQuestion.questionAnswers.forEach((answer) => {
      answer.isSelected = false;
    });

    // update task status
    const taskStatus = adaptivityElementProgressUpdateTO.taskInfo.taskStatus;
    if (
      taskStatus === AdaptivityElementStatusTypes.Correct &&
      questionStatus === AdaptivityElementStatusTypes.Correct
    ) {
      updatedTask.isCompleted = true;
      updatedTask.hasBeenCompleted = true;
    } else if (taskStatus === AdaptivityElementStatusTypes.Incorrect)
      updatedTask.isCompleted = false;
    else updatedTask.isCompleted = null;

    this.viewModel.showFeedback.Value = true;
  }

  onAdaptivityElementUserHintInformed?(
    adaptivityElementHintTO: AdaptivityElementHintTO,
  ): void {
    const hint = {
      hintID: adaptivityElementHintTO.hintID,
      showOnIsWrong: adaptivityElementHintTO.showOnIsWrong,
      hintAction: {
        hintActionType: adaptivityElementHintTO.hintAction.hintActionType,
        idData: adaptivityElementHintTO.hintAction.idData,
        textData: adaptivityElementHintTO.hintAction.textData,
      } as AdaptivityHintAction,
    } as AdaptivityHint;
    this.viewModel.selectedHint.Value = hint;
  }

  onAdaptivityElementQuestionAnsweredCorrectly?(
    questionPresentationUpdateTO: AdaptivityElementQuestionPresentationUpdateTO,
  ): void {
    const questionToBeUpdated = this.viewModel.contentData.Value.tasks
      .find(
        (task) => task.taskID === questionPresentationUpdateTO.taskInfo.taskId,
      )!
      .questions.find(
        (question) =>
          question.questionID ===
          questionPresentationUpdateTO.questionInfo.questionId,
      )!;

    questionToBeUpdated.questionAnswers.map((answer, index) => {
      return (answer.isCorrect =
        questionPresentationUpdateTO.questionInfo.answers[index].correct &&
        questionPresentationUpdateTO.questionInfo.answers[index].checked);
    });
  }

  @bind
  private setFooterBreadcrumbs(): void {
    let newFooterText = this.viewModel.contentData.Value.elementName;

    if (this.viewModel.currentTask.Value !== null) {
      newFooterText += " \u2794 " + this.viewModel.currentTask.Value.taskTitle;

      if (this.viewModel.currentQuestion.Value !== null) {
        switch (this.viewModel.currentQuestion.Value.difficulty) {
          case AdaptivityElementQuestionDifficultyTypes.easy:
            newFooterText +=
              " \u2794 " + i18next.t("easyQuestion", { ns: "learningElement" });
            break;
          case AdaptivityElementQuestionDifficultyTypes.medium:
            newFooterText +=
              " \u2794 " +
              i18next.t("normalQuestion", { ns: "learningElement" });
            break;
          case AdaptivityElementQuestionDifficultyTypes.hard:
            newFooterText +=
              " \u2794 " + i18next.t("hardQuestion", { ns: "learningElement" });
            break;
        }
      }
    }

    this.viewModel.footerText.Value = newFooterText;
  }

  private setContentData(
    adaptivityElementProgressTO: AdaptivityElementProgressTO,
  ): void {
    const newTasks: AdaptivityTask[] = this.mapTasks(
      adaptivityElementProgressTO.tasks,
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
        questions: this.mapQuestions(
          task.questions,
          task.requiredDifficulty,
          task.taskOptional,
        ),
        isCompleted: task.isCompleted,
        hasBeenCompleted: task.isCompleted !== null ? task.isCompleted : false,
        requiredDifficulty: task.requiredDifficulty,
        isRequired: !task.taskOptional,
      } as AdaptivityTask;
    });
  }

  private sortQuestionsByDifficulty(
    questions: AdaptivityElementQuestionProgressTO[],
  ) {
    questions.sort(
      (
        a: AdaptivityElementQuestionProgressTO,
        b: AdaptivityElementQuestionProgressTO,
      ) => {
        return a.questionDifficulty - b.questionDifficulty;
      },
    );
  }

  private mapQuestions(
    questions: AdaptivityElementQuestionProgressTO[],
    requiredDifficulty: AdaptivityElementQuestionDifficultyTypes,
    isTaskOptional: boolean,
  ): AdaptivityQuestion[] {
    this.sortQuestionsByDifficulty(questions);
    return questions.map((question) => {
      // TODO: this is not completely correct yet
      // What happens if the required difficulty is something like 86?
      const isRequired =
        requiredDifficulty === question.questionDifficulty && !isTaskOptional;

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

  private mapAnswers(answers: AdaptivityElementAnswerTO[]): AdaptivityAnswer[] {
    return answers.map((answer) => {
      return {
        answerIndex: answer.answerId,
        answerText: answer.answerText,
        isSelected: false,
        isCorrect: answer.answerIsCorrect,
      } as AdaptivityAnswer;
    });
  }

  private mapAdaptivityTriggers(
    triggers: AdaptivityElementTriggerTO[],
  ): AdaptivityHint[] {
    if (!triggers.length) return [];

    return triggers.map((trigger) => {
      return {
        hintID: trigger.triggerId,
        showOnIsWrong:
          trigger.triggerCondition ===
          AdaptivityElementTriggerConditionTypes.incorrect,
        hintAction: {
          hintActionType: trigger.triggerAction.actionType,
          idData: trigger.triggerAction.idData,
          textData: trigger.triggerAction.textData,
        } as AdaptivityHintAction,
      } as AdaptivityHint;
    });
  }
}
