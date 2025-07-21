import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { EmotionType } from "../../Domain/Types/EmotionTypes";

export default class BackendStoryTO {
  storyTexts: string[];
  elementModel: LearningElementModel;
  facialExpression: EmotionType;
  storyNpcName?: string;
  exitAfterStorySequence?: boolean;
}
