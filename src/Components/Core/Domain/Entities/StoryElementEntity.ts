import { LearningElementModel } from "../LearningElementModels/LearningElementModelTypes";
import { ComponentID } from "../Types/EntityTypes";
import { StoryElementType } from "../Types/StoryElementType";

export default class StoryElementEntity {
  spaceID: ComponentID;
  introStoryTexts: string[] | null;
  outroStoryTexts: string[] | null;
  modelType: LearningElementModel | null;
  storyType: StoryElementType;
}
