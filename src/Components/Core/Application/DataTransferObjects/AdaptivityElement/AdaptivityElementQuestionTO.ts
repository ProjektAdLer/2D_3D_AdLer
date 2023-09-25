import AdaptivityElementAnswersTO from "./AdaptivityElementAnswerTO";
import AdaptivityElementTriggerTO from "./AdaptivityElementTriggerTO";

export default class AdaptivityElementQuestionTO {
  questionType: string;
  questionId: number;
  questionDifficulty: number;
  questionText: string;
  questionAnswers: AdaptivityElementAnswersTO[];
  trigger: AdaptivityElementTriggerTO[];
}
