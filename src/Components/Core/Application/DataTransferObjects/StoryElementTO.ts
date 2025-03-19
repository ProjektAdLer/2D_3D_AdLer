import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { EmotionType } from "../../Domain/Types/EmotionTypes";
import { StoryElementType } from "../../Domain/Types/StoryElementType";

export default class StoryElementTO {
  introStoryTexts: string[] | null;
  outroStoryTexts: string[] | null;
  modelType: LearningElementModel | null;
  storyType: StoryElementType;
  introEmotion: EmotionType | null;
  outroEmotion: EmotionType | null;
}
