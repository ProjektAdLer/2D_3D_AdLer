import { AdaptivityElementQuestionTypes } from "./../../../Domain/Types/Adaptivity/AdaptivityElementQuestionTypes";
import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import AdaptivityElementAnswersTO from "./AdaptivityElementAnswerTO";
import AdaptivityElementTriggerTO from "./AdaptivityElementTriggerTO";

export default class AdaptivityElementQuestionTO {
  questionType: AdaptivityElementQuestionTypes;
  questionId: number;
  questionDifficulty: AdaptivityElementQuestionDifficultyTypes;
  questionText: string;
  questionAnswers: AdaptivityElementAnswersTO[];
  triggers: AdaptivityElementTriggerTO[];
}
