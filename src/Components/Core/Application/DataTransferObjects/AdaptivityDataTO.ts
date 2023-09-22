export class AdaptivityDataTO {
  introText: string;
  shuffleTask: boolean;
  tasks: AdaptivityTaskTO[];
}

export class AdaptivityTaskTO {
  taskId: number;
  taskTitle: string;
  taskOptional: boolean;
  requieredDifficulty: number;
  questions: AdaptivityQuestionTO[];
}

export class AdaptivityQuestionTO {
  questionType: string;
  questionId: number;
  questionDifficulty: number;
  questionText: string;
  questionAnswers: AdaptivityAnswersTO[];
  trigger: AdaptivityTriggerTO[];
}

export class AdaptivityAnswersTO {
  answerId: number;
  answerText?: string;
  answerImage?: string;
}

export class AdaptivityTriggerTO {
  triggerId: number;
  triggerType: string;
  triggerCondition: string;
  triggerAction: AdaptivityActionTO;
}

export class AdaptivityActionTO {
  actionType: string;
  actionData: string | number;
}
