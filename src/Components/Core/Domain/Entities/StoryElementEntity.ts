import { LearningElementModel } from "../LearningElementModels/LearningElementModelTypes";
import { ComponentID } from "../Types/EntityTypes";
import { StoryElementType } from "../Types/StoryElementType";

export default class StoryElementEntity {
  worldID: ComponentID;
  spaceID: ComponentID;
  storyTexts: string[];
  modelType: LearningElementModel;
  storyType: StoryElementType;
}
