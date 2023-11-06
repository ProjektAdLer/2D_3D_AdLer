import { AdaptivityElementQuestionTypes } from "./../../Domain/Types/Adaptivity/AdaptivityElementQuestionTypes";
import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import { AdaptivityElementTriggerConditionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementTriggerConditionTypes";
import { AdaptivityElementDataTO } from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementDataTO";
import BackendElementTO from "../../Application/DataTransferObjects/BackendElementTO";
import BackendSpaceTO from "../../Application/DataTransferObjects/BackendSpaceTO";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import { isValidLearningElementModelType } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../../Domain/Types/LearningElementTypes";
import { LearningSpaceTemplateType } from "../../Domain/Types/LearningSpaceTemplateType";
import { LearningSpaceThemeType } from "../../Domain/Types/LearningSpaceThemeTypes";
import AWT, {
  APIAdaptivity,
  APIAdaptivityAction,
  APIAdaptivityAnswers,
  APIAdaptivityQuestion,
  APIAdaptivityTask,
  APIAdaptivityTrigger,
  APIElement,
  APISpace,
} from "./Types/AWT";
import AdaptivityElementActionTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementActionTO";
import AdaptivityElementTriggerTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementTriggerTO";
import AdaptivityElementAnswersTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementAnswerTO";
import AdaptivityElementQuestionTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionTO";
import AdaptivityElementTaskTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementTaskTO";
import { AdaptivityElementActionTypes } from "../../Domain/Types/Adaptivity/AdaptivityElementActionTypes";

/**
 * This class contains static utility functions for the BackendAdapters
 */
export default class BackendAdapterUtils {
  public static parseAWT(awt: AWT): BackendWorldTO {
    const elements: BackendElementTO[] = this.mapElements(awt.world.elements);

    const spaces: BackendSpaceTO[] = this.mapSpaces(awt.world.spaces, elements);

    const elementsInSpace = spaces.flatMap((space) => {
      return space.elements.filter((e) => e !== null);
    });

    // every element that is not in a space is an external learning element
    const difference = elements.filter((e) => !elementsInSpace.includes(e));

    const response: BackendWorldTO = {
      worldName: awt.world.worldName,
      goals: awt.world.worldGoals ?? [""],
      spaces: spaces,
      description: awt.world.worldDescription ?? "",
      evaluationLink: awt.world.evaluationLink ?? "",
      externalElements: difference,
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
        const adaptivityData = this.extractAdaptivityData(
          element.elementId,
          element.adaptivityContent
        );
        const model = this.extractModelData(element.elementModel);

        return {
          id: element.elementId,
          description: element.elementDescription ?? "",
          goals: element.elementGoals ?? [""],
          name: element.elementName,
          type: element.elementCategory ?? "",
          value: element.elementMaxScore ?? 0,
          model: model,
          adaptivity: adaptivityData,
        } as BackendElementTO;
      } else return [];
    });
  }

  private static extractModelData(modelData?: string): string | undefined {
    if (modelData === undefined) {
      return undefined;
    }

    if (isValidLearningElementModelType(modelData)) {
      return modelData;
    } else {
      return undefined;
    }
  }

  private static extractAdaptivityData(
    id: number,
    adaptivitydata?: APIAdaptivity
  ): AdaptivityElementDataTO | undefined {
    if (adaptivitydata === undefined) {
      return undefined;
    }

    const newAdaptivityTO = new AdaptivityElementDataTO();
    newAdaptivityTO.introText = adaptivitydata.introText;
    newAdaptivityTO.tasks = [];
    newAdaptivityTO.id = id;

    this.mapAdaptivityTasks(
      newAdaptivityTO.tasks,
      adaptivitydata.adaptivityTasks
    );

    return newAdaptivityTO;
  }

  private static mapAdaptivityTasks(
    tasks: AdaptivityElementTaskTO[],
    apiTasks: APIAdaptivityTask[]
  ) {
    apiTasks.forEach((task) => {
      tasks.push({
        taskId: task.taskId,
        taskTitle: task.taskTitle,
        taskOptional:
          task.optional !== undefined && task.requiredDifficulty !== undefined
            ? task.optional
            : true,
        requiredDifficulty: this.mapAdaptivityElementQuestionDifficulty(
          task.requiredDifficulty
        ),
        questions: [],
      } as AdaptivityElementTaskTO);

      this.mapAdaptivityQuestions(
        tasks.at(-1)!.questions,
        task.adaptivityQuestions
      );
    });
  }

  private static mapAdaptivityQuestions(
    questions: AdaptivityElementQuestionTO[],
    apiQuestions: APIAdaptivityQuestion[]
  ) {
    apiQuestions.forEach((question) => {
      questions.push({
        questionId: question.questionId,
        questionType:
          AdaptivityElementQuestionTypes[
            question.questionType as keyof typeof AdaptivityElementQuestionTypes
          ],
        questionDifficulty: this.mapAdaptivityElementQuestionDifficulty(
          question.questionDifficulty
        ),
        questionText: question.questionText,
        questionAnswers: [],
        triggers: [],
      } as AdaptivityElementQuestionTO);

      this.mapAdaptivityAnswers(
        questions.at(-1)!.questionAnswers,
        question.choices
      );

      this.mapAdaptivityTrigger(
        questions.at(-1)!.triggers,
        question.adaptivityRules
      );
    });
  }

  private static mapAdaptivityElementQuestionDifficulty(
    difficulty: number | undefined
  ): AdaptivityElementQuestionDifficultyTypes | undefined {
    if (difficulty === undefined) {
      return AdaptivityElementQuestionDifficultyTypes.easy;
    } else if (difficulty >= 200)
      return AdaptivityElementQuestionDifficultyTypes.hard;
    else if (difficulty >= 100)
      return AdaptivityElementQuestionDifficultyTypes.medium;
    else if (difficulty >= 0)
      return AdaptivityElementQuestionDifficultyTypes.easy;
    else return AdaptivityElementQuestionDifficultyTypes.easy;
  }

  private static mapAdaptivityAnswers(
    answers: AdaptivityElementAnswersTO[],
    possibleAnswers: APIAdaptivityAnswers[]
  ) {
    let answerID = 0; // ID for communication with backend's index of answer
    possibleAnswers.forEach((answer) => {
      answers.push({
        answerId: answerID,
        answerText: answer.answerText,
        answerImage: answer.answerImage,
      } as AdaptivityElementAnswersTO);
      answerID++;
    });
  }

  private static mapAdaptivityTrigger(
    trigger: AdaptivityElementTriggerTO[],
    rules: APIAdaptivityTrigger[]
  ) {
    rules.forEach((rule) => {
      trigger.push({
        triggerId: rule.triggerId,
        triggerCondition:
          AdaptivityElementTriggerConditionTypes[
            rule.triggerCondition as keyof typeof AdaptivityElementTriggerConditionTypes
          ],
        triggerAction: this.mapAdaptivityAction(rule.adaptivityAction),
      } as AdaptivityElementTriggerTO);
    });
  }

  private static mapAdaptivityAction(
    triggerAction: APIAdaptivityAction
  ): AdaptivityElementActionTO {
    let actionType;
    switch (triggerAction.$type) {
      case "CommentAction":
        actionType = AdaptivityElementActionTypes.CommentAction;
        break;
      case "AdaptivityReferenceAction":
        actionType = AdaptivityElementActionTypes.ReferenceAction;
        break;
      case "AdaptivityContentReferenceAction":
        actionType = AdaptivityElementActionTypes.ContentAction;
        break;
      default:
        actionType = undefined;
        break;
    }

    let textData;
    if (triggerAction.commentText) {
      textData = triggerAction.commentText;
    } else if (triggerAction.hintText) {
      textData = triggerAction.hintText;
    }

    return {
      actionType: actionType,
      idData: triggerAction.elementId ? triggerAction.elementId : undefined,
      textData: textData,
    } as AdaptivityElementActionTO;
  }
}
