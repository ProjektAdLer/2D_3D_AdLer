import { LearningElementModel } from "../LearningElementModels/LearningElementModelTypes";
import { EmotionType } from "../Types/EmotionTypes";
import { ComponentID } from "../Types/EntityTypes";
import { StoryElementType } from "../Types/StoryElementType";

export default class StoryElementEntity {
  worldID: ComponentID;
  spaceID: ComponentID;
  introStoryTexts: string[] | null;
  outroStoryTexts: string[] | null;
  modelType: LearningElementModel | null;
  storyType: StoryElementType;
  hasOutroTriggered: boolean | null;
  introEmotion: EmotionType | null;
  outroEmotion: EmotionType | null;
}
