import AdaptivityElementQuestionProgressTO from "./AdaptivityElementQuestionProgressTO";
import AdaptivityElementTaskTO from "./AdaptivityElementTaskTO";

export default class AdaptivityElementTaskProgressTO extends AdaptivityElementTaskTO {
  isCompleted: boolean | null;
  override questions: AdaptivityElementQuestionProgressTO[];
}
