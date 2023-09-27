import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import AdaptivityElementQuestionTO from "./AdaptivityElementQuestionTO";

export default class AdaptivityElementTaskTO {
  taskId: number;
  taskTitle: string;
  taskOptional: boolean;
  requiredDifficulty: AdaptivityElementQuestionDifficultyTypes;
  questions: AdaptivityElementQuestionTO[];
}
