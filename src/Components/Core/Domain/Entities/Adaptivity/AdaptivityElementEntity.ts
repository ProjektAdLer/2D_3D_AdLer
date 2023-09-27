import { AdaptivityElementQuestionDifficultyTypes } from "../../Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import LearningElementEntity from "../LearningElementEntity";

export default class AdaptivityElementEntity {
  element: LearningElementEntity;
  introText: string;
  shuffleTask: boolean;
  tasks: AdaptivityTaskEntity[];
}

export class AdaptivityTaskEntity {
  taskId: number;
  taskTitle: string;
  taskOptional: boolean;
  requieredDifficulty: AdaptivityElementQuestionDifficultyTypes;
  questions: AdaptivityQuestionEntity[];
}

export class AdaptivityQuestionEntity {
  questionType: string;
  questionId: number;
  questionDifficulty: AdaptivityElementQuestionDifficultyTypes;
  questionText: string;
  questionAnswers: AdaptivityAnswerEntity[];
  trigger: AdaptivityTriggerEntity[];
}

export class AdaptivityAnswerEntity {
  answerId: number;
  answerText?: string;
  answerImage?: string;
}

export class AdaptivityTriggerEntity {
  triggerId: number;
  triggerType: string;
  triggerCondition: string;
  triggerAction: AdaptivityActionEntity;
}

export class AdaptivityActionEntity {
  actionType: string;
  actionData: string | number;
}
