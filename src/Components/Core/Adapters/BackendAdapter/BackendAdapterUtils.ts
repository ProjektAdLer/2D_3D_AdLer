import {
  AdaptivityActionTO,
  AdaptivityAnswersTO,
  AdaptivityTriggerTO,
  AdaptivityDataTO,
  AdaptivityQuestionTO,
  AdaptivityTaskTO,
} from "./../../Application/DataTransferObjects/AdaptivityDataTO";
import BackendElementTO from "../../Application/DataTransferObjects/BackendElementTO";
import BackendSpaceTO from "../../Application/DataTransferObjects/BackendSpaceTO";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import {
  LearningElementModelTypeEnums,
  isValidLearningElementModelType,
} from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../../Domain/Types/LearningElementTypes";
import { LearningSpaceTemplateType } from "../../Domain/Types/LearningSpaceTemplateType";
import { LearningSpaceThemeType } from "../../Domain/Types/LearningSpaceThemeTypes";
import AWT, {
  APIAdaptivity,
  APIAdaptivityAnswers,
  APIAdaptivityQuestion,
  APIAdaptivityTask,
  APIAdaptivityTrigger,
  APIElement,
  APISpace,
} from "./Types/AWT";

/**
 * This class contains static utility functions for the BackendAdapters
 */
export default class BackendAdapterUtils {
  public static parseAWT(awt: AWT): BackendWorldTO {
    const elements: BackendElementTO[] = this.mapElements(awt.world.elements);

    const spaces: BackendSpaceTO[] = this.mapSpaces(awt.world.spaces, elements);

    const response: BackendWorldTO = {
      worldName: awt.world.worldName,
      goals: awt.world.worldGoals ?? [""],
      spaces: spaces,
      description: awt.world.worldDescription ?? "",
      evaluationLink: awt.world.evaluationLink ?? "",
    };

    return response;
  }

  // maps the spaces from the AWT to BackendSpaceTOs and connects them with their elements
  private static mapSpaces(
    spaces: APISpace[],
    elements: BackendElementTO[]
  ): BackendSpaceTO[] {
    return spaces.map((space) => {
      // compare template type to supported templates
      let template: string;
      if (
        !Object.values<string>(LearningSpaceTemplateType).includes(
          space.spaceTemplate.toUpperCase()
        )
      ) {
        template = LearningSpaceTemplateType.None;
      } else {
        template = space.spaceTemplate.toUpperCase();
      }

      let templateStyle: LearningSpaceThemeType;
      if (
        !Object.values<string>(LearningSpaceThemeType).includes(
          space.spaceTemplateStyle.toUpperCase()
        )
      ) {
        templateStyle = LearningSpaceThemeType.Campus;
      } else {
        // cast to enum
        templateStyle =
          space.spaceTemplateStyle.toUpperCase() as LearningSpaceThemeType;
      }

      return {
        id: space.spaceId,
        name: space.spaceName,
        elements: space.spaceSlotContents.map((elementId) => {
          if (elementId === null) return null;
          else return elements.find((element) => element.id === elementId);
        }),
        description: space.spaceDescription ?? "",
        goals: space.spaceGoals ?? [""],
        requirements: space.requiredSpacesToEnter,
        requiredScore: space.requiredPointsToComplete,
        template: template,
        templateStyle: templateStyle,
      } as BackendSpaceTO;
    });
  }

  // creates BackendElementTOs from the AWT if the element type is supported
  private static mapElements(elements: APIElement[]): BackendElementTO[] {
    return elements.flatMap((element) => {
      if (element.elementCategory in LearningElementTypes) {
        let model: string;
        if (isValidLearningElementModelType(element.elementModel)) {
          model = element.elementModel;
        } else {
          model = LearningElementModelTypeEnums.NoElementModelTypes.None;
        }

        return {
          id: element.elementId,
          description: element.elementDescription,
          goals: element.elementGoals ?? [""],
          name: element.elementName,
          type: element.elementCategory ?? "",
          value: element.elementMaxScore || 0,
          model: model,
          adaptivity: this.extractAdaptivityData(element.adaptivityContent),
        } as BackendElementTO;
      } else return [];
    });
  }

  private static extractAdaptivityData(
    adaptivitydata?: APIAdaptivity
  ): AdaptivityDataTO | undefined {
    if (adaptivitydata === undefined) {
      return undefined;
    }

    const newAdaptivityTO = new AdaptivityDataTO();
    newAdaptivityTO.introText = adaptivitydata.introText;
    newAdaptivityTO.shuffleTask = adaptivitydata.shuffleTasks;
    newAdaptivityTO.tasks = [];

    this.mapAdaptivityTasks(
      newAdaptivityTO.tasks,
      adaptivitydata.adaptivityTasks
    );

    return newAdaptivityTO;
  }

  private static mapAdaptivityTasks(
    tasks: AdaptivityTaskTO[],
    apiTasks: APIAdaptivityTask[]
  ) {
    apiTasks.forEach((task) => {
      tasks.push({
        taskId: task.taskId,
        taskTitle: task.taskTitle,
        taskOptional: task.optional,
        requieredDifficulty: task.requiredDifficulty,
        questions: [],
      } as AdaptivityTaskTO);

      this.mapAdaptivityQuestions(
        tasks.at(-1)!.questions,
        task.adaptivityQuestions
      );
    });
  }

  private static mapAdaptivityQuestions(
    questions: AdaptivityQuestionTO[],
    apiQuestions: APIAdaptivityQuestion[]
  ) {
    apiQuestions.forEach((question) => {
      questions.push({
        questionId: question.questionId,
        questionType: question.questionType,
        questionDifficulty: question.questionDifficulty,
        questionText: question.questionText,
        questionAnswers: [],
        trigger: [],
      } as AdaptivityQuestionTO);

      this.mapAdaptivityAnswers(
        questions.at(-1)!.questionAnswers,
        question.possibleAnswers
      );

      this.mapAdaptivityTrigger(
        questions.at(-1)!.trigger,
        question.adaptivityRules
      );
    });
  }

  private static mapAdaptivityAnswers(
    answers: AdaptivityAnswersTO[],
    possibleAnswers: APIAdaptivityAnswers[]
  ) {
    let answerID = 0; // ID for communication with backend's index of answer
    possibleAnswers.forEach((answer) => {
      answers.push({
        answerId: answerID,
        answerText: answer.answerText,
        answerImage: answer.answerImage,
      } as AdaptivityAnswersTO);
      answerID++;
    });
  }

  private static mapAdaptivityTrigger(
    trigger: AdaptivityTriggerTO[],
    rules: APIAdaptivityTrigger[]
  ) {
    rules.forEach((rule) => {
      trigger.push({
        triggerId: rule.triggerId,
        triggerCondition: rule.triggerCondition,
        triggerAction: {
          actionData:
            rule.adaptivityAction.commentText ??
            rule.adaptivityAction.elementId,
        } as AdaptivityActionTO,
      } as AdaptivityTriggerTO);
    });
  }
}
