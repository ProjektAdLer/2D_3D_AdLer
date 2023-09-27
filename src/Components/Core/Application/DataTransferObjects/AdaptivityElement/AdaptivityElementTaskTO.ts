import AdaptivityElementQuestionTO from "./AdaptivityElementQuestionTO";

export default class AdaptivityElementTaskTO {
  taskId: number;
  taskTitle: string;
  taskOptional: boolean;
  requiredDifficulty: number;
  questions: AdaptivityElementQuestionTO[];
}
