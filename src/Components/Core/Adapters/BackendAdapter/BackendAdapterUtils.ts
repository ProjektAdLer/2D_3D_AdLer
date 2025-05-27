import { BackendAvatarConfigTO } from "./../../Application/DataTransferObjects/BackendAvatarConfigTO";
import { BackendAdaptivityElementTO } from "./../../Application/DataTransferObjects/BackendElementTO";
import { AdaptivityElementQuestionTypes } from "./../../Domain/Types/Adaptivity/AdaptivityElementQuestionTypes";
import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import { AdaptivityElementTriggerConditionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementTriggerConditionTypes";
import { AdaptivityElementDataTO } from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementDataTO";
import {
  BackendBaseElementTO,
  BackendLearningElementTO,
} from "../../Application/DataTransferObjects/BackendElementTO";
import BackendSpaceTO from "../../Application/DataTransferObjects/BackendSpaceTO";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import {
  LearningElementModel,
  isValidLearningElementModelType,
} from "../../Domain/LearningElementModels/LearningElementModelTypes";
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
  APIStoryElement,
} from "./Types/AWT";
import AdaptivityElementActionTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementActionTO";
import AdaptivityElementTriggerTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementTriggerTO";
import AdaptivityElementAnswerTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementAnswerTO";
import AdaptivityElementQuestionTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionTO";
import AdaptivityElementTaskTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementTaskTO";
import { AdaptivityElementActionTypes } from "../../Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import BackendStoryTO from "../../Application/DataTransferObjects/BackendStoryTO";
import AvatarConfigTO from "../../Application/DataTransferObjects/AvatarConfigTO";
import {
  AvatarEyeBrowTexture,
  AvatarEyeTexture,
  AvatarMouthTexture,
  AvatarNoseTexture,
} from "../../Domain/AvatarModels/AvatarFaceUVTexture";
import AvatarColorPalette from "../../Domain/AvatarModels/AvatarColorPalette";
import AvatarSkinColorPalette from "../../Domain/AvatarModels/AvatarSkinColorPalette";
import { EmotionType } from "../../Domain/Types/EmotionTypes";

type BackendTO =
  | BackendBaseElementTO
  | BackendLearningElementTO
  | BackendAdaptivityElementTO;
/**
 * This class contains static utility functions for the BackendAdapters
 */
export default class BackendAdapterUtils {
  public static parseAWT(awt: AWT): BackendWorldTO {
    const elements: BackendTO[] = this.mapElements(awt.world.elements);

    const spaces: BackendSpaceTO[] = this.mapSpaces(awt.world.spaces, elements);

    // every BackendBaseElementTO is an external learning element
    const externalLearningElements: BackendBaseElementTO[] = elements.filter(
      (e) => {
        return (
          e instanceof BackendBaseElementTO &&
          e instanceof BackendLearningElementTO === false &&
          e instanceof BackendAdaptivityElementTO === false
        );
      },
    );

    // assigns the world the right theme
    let theme: LearningSpaceThemeType;
    if (
      !awt.world.theme ||
      !Object.values<string>(LearningSpaceThemeType).includes(
        awt.world.theme.toUpperCase(),
      )
    ) {
      theme = LearningSpaceThemeType.Campus;
    } else {
      // cast to enum
      theme = awt.world.theme!.toUpperCase() as LearningSpaceThemeType;
    }

    const response: BackendWorldTO = {
      worldName: awt.world.worldName,
      goals: awt.world.worldGoals ?? [""],
      spaces: spaces,
      description: awt.world.worldDescription ?? "",
      evaluationLink: awt.world.evaluationLink ?? "",
      externalElements: externalLearningElements,
      narrativeFramework: awt.world.frameStory ?? null,
      theme: theme,
      gradingStyle: awt.world.worldGradingStyle ?? null,
    };

    return response;
  }

  // maps the spaces from the AWT to BackendSpaceTOs and connects them with their elements
  private static mapSpaces(
    spaces: APISpace[],
    elements: BackendTO[],
  ): BackendSpaceTO[] {
    return spaces.map((space) => {
      // compare template type to supported templates
      let template: string;
      if (
        !Object.values<string>(LearningSpaceTemplateType).includes(
          space.spaceTemplate.toUpperCase(),
        )
      ) {
        template = LearningSpaceTemplateType.None;
      } else {
        template = space.spaceTemplate.toUpperCase();
      }

      let templateStyle: LearningSpaceThemeType;
      if (
        !Object.values<string>(LearningSpaceThemeType).includes(
          space.spaceTemplateStyle.toUpperCase(),
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
        introStory: this.mapStoryElement(space.spaceStory?.introStory),
        outroStory: this.mapStoryElement(space.spaceStory?.outroStory),
      } as BackendSpaceTO;
    });
  }

  private static mapStoryElement(
    storyElement: APIStoryElement | null,
  ): BackendStoryTO | null {
    if (storyElement === null || storyElement === undefined) return null;
    else {
      let backendStoryTO = new BackendStoryTO();
      backendStoryTO.storyTexts = storyElement.storyTexts;
      backendStoryTO.storyNpcName = storyElement.storyNpcName ?? undefined;
      backendStoryTO.elementModel = this.extractModelData(
        storyElement.elementModel,
      ) as LearningElementModel;

      if (
        storyElement.modelFacialExpression &&
        Object.values<string>(EmotionType).includes(
          storyElement.modelFacialExpression,
        )
      ) {
        backendStoryTO.facialExpression =
          storyElement.modelFacialExpression as EmotionType;
      } else {
        backendStoryTO.facialExpression = EmotionType.welcome;
      }
      return backendStoryTO;
    }
  }

  // creates BackendElementTOs from the AWT if the element type is supported
  private static mapElements(elements: APIElement[]): BackendTO[] {
    return elements.flatMap((element) => {
      if (element.$type === "BaseLearningElement") {
        let base = new BackendBaseElementTO();
        this.assignBasicTOData(base, element);
        return base;
      } else if (element.$type === "LearningElement") {
        let learning = new BackendLearningElementTO();
        this.assignBasicTOData(learning, element);
        this.assignLearningTOData(learning, element);
        return learning;
      } else if (element.$type === "AdaptivityElement") {
        let adaptiv = new BackendAdaptivityElementTO();
        this.assignBasicTOData(adaptiv, element);
        this.assignLearningTOData(adaptiv, element);
        adaptiv.adaptivity = this.extractAdaptivityData(
          element.elementId,
          element.adaptivityContent!,
        );
        return adaptiv;
      } else return [];
    });
  }

  private static assignBasicTOData(
    elementTO: BackendTO,
    apiElement: APIElement,
  ): void {
    elementTO.id = apiElement.elementId;
    elementTO.name = apiElement.elementName;
    elementTO.type = apiElement.elementCategory as LearningElementTypes;
  }

  private static assignLearningTOData(
    elementTO: BackendLearningElementTO | BackendAdaptivityElementTO,
    apiElement: APIElement,
  ): void {
    elementTO.description = apiElement.elementDescription ?? "";
    elementTO.value = apiElement.elementMaxScore ?? 0;
    elementTO.goals = apiElement.elementGoals ?? [""];
    elementTO.model = this.extractModelData(
      apiElement.elementModel,
    ) as LearningElementModel;
    elementTO.difficulty = apiElement.elementDifficulty ?? 0;
  }
  private static extractModelData(modelData?: string): string | undefined {
    if (
      modelData === undefined ||
      !isValidLearningElementModelType(modelData)
    ) {
      return undefined;
    } else {
      return modelData;
    }
  }

  private static extractAdaptivityData(
    id: number,
    adaptivitydata: APIAdaptivity,
  ): AdaptivityElementDataTO {
    const newAdaptivityTO = new AdaptivityElementDataTO();
    newAdaptivityTO.introText = adaptivitydata.introText;
    newAdaptivityTO.tasks = [];
    newAdaptivityTO.id = id;

    this.mapAdaptivityTasks(
      newAdaptivityTO.tasks,
      adaptivitydata.adaptivityTasks,
    );

    return newAdaptivityTO;
  }

  private static mapAdaptivityTasks(
    tasks: AdaptivityElementTaskTO[],
    apiTasks: APIAdaptivityTask[],
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
          task.requiredDifficulty,
        ),
        questions: [],
      } as AdaptivityElementTaskTO);

      this.mapAdaptivityQuestions(
        tasks.at(-1)!.questions,
        task.adaptivityQuestions,
      );
    });
  }

  private static mapAdaptivityQuestions(
    questions: AdaptivityElementQuestionTO[],
    apiQuestions: APIAdaptivityQuestion[],
  ) {
    apiQuestions.forEach((question) => {
      questions.push({
        questionId: question.questionId,
        questionType:
          AdaptivityElementQuestionTypes[
            question.questionType as keyof typeof AdaptivityElementQuestionTypes
          ],
        questionDifficulty: this.mapAdaptivityElementQuestionDifficulty(
          question.questionDifficulty,
        ),
        questionText: question.questionText,
        questionAnswers: [],
        triggers: [],
      } as AdaptivityElementQuestionTO);

      this.mapAdaptivityAnswers(
        questions.at(-1)!.questionAnswers,
        question.choices,
      );

      this.mapAdaptivityTrigger(
        questions.at(-1)!.triggers,
        question.adaptivityRules,
      );
    });
  }

  private static mapAdaptivityElementQuestionDifficulty(
    difficulty: number | undefined,
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
    answers: AdaptivityElementAnswerTO[],
    possibleAnswers: APIAdaptivityAnswers[],
  ) {
    let answerID = 0; // ID for communication with backend's index of answer
    possibleAnswers.forEach((answer) => {
      answers.push({
        answerId: answerID,
        answerText: answer.answerText,
        answerImage: answer.answerImage,
      } as AdaptivityElementAnswerTO);
      answerID++;
    });
  }

  private static mapAdaptivityTrigger(
    trigger: AdaptivityElementTriggerTO[],
    rules: APIAdaptivityTrigger[],
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
    triggerAction: APIAdaptivityAction,
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

  public static convertBackendAvatarConfigToAvatarConfig(
    backendConfig: BackendAvatarConfigTO,
  ): AvatarConfigTO {
    const config = new AvatarConfigTO();
    Object.assign(config, backendConfig);

    // face textures
    config.eyebrows =
      AvatarEyeBrowTexture.find(
        (eyebrow) => eyebrow.name === backendConfig.eyebrows,
      )?.id ?? 0;
    config.eyes =
      AvatarEyeTexture.find((eye) => eye.name === backendConfig.eyes)?.id ?? 0;
    config.nose =
      AvatarNoseTexture.find((nose) => nose.name === backendConfig.nose)?.id ??
      0;
    config.mouth =
      AvatarMouthTexture.find((mouth) => mouth.name === backendConfig.mouth)
        ?.id ?? 0;
    // colors
    config.hairColor =
      AvatarColorPalette.find(
        (hairColor) => hairColor.id === backendConfig.hairColor,
      ) ?? AvatarColorPalette[0];
    config.shirtColor =
      AvatarColorPalette.find(
        (shirtColor) => shirtColor.id === backendConfig.shirtColor,
      ) ?? AvatarColorPalette[0];
    config.pantsColor =
      AvatarColorPalette.find(
        (pantsColor) => pantsColor.id === backendConfig.pantsColor,
      ) ?? AvatarColorPalette[0];
    config.shoesColor =
      AvatarColorPalette.find(
        (shoesColor) => shoesColor.id === backendConfig.shoesColor,
      ) ?? AvatarColorPalette[0];
    config.skinColor =
      AvatarSkinColorPalette.find(
        (skinColor) => skinColor.id === Number(backendConfig.skinColor),
      ) ?? AvatarSkinColorPalette[0];
    return config;
  }

  public static convertAvatarConfigToBackendAvatarConfig(
    config: AvatarConfigTO,
  ): BackendAvatarConfigTO {
    let backendavatarConfig = new BackendAvatarConfigTO();
    Object.assign(backendavatarConfig, config);
    // face
    backendavatarConfig.eyebrows = AvatarEyeBrowTexture[config.eyebrows].name;
    backendavatarConfig.eyes = AvatarEyeTexture[config.eyes].name;
    backendavatarConfig.nose = AvatarNoseTexture[config.nose].name;
    backendavatarConfig.mouth = AvatarMouthTexture[config.mouth].name;
    // colors
    backendavatarConfig.hairColor = config.hairColor.id;
    backendavatarConfig.shirtColor = config.shirtColor.id;
    backendavatarConfig.pantsColor = config.pantsColor.id;
    backendavatarConfig.shoesColor = config.shoesColor.id;
    backendavatarConfig.skinColor = config.skinColor.id;
    return backendavatarConfig;
  }
}
