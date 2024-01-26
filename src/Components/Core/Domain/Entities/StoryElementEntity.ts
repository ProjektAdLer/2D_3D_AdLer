import { LearningElementModel } from "../LearningElementModels/LearningElementModelTypes";
import { ComponentID } from "../Types/EntityTypes";
import { StoryElementType } from "../Types/StoryElementType";

export default class StoryElementEntity {
  worldID: ComponentID;
  spaceID: ComponentID;
  introStoryTexts: string[] | null;
  outroStoryTexts: string[] | null;
  modelType: LearningElementModel | null;
  storyType: StoryElementType;
}
