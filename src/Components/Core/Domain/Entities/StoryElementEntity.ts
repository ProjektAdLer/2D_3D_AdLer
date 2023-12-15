import { LearningElementModel } from "../LearningElementModels/LearningElementModelTypes";
import { ComponentID } from "../Types/EntityTypes";
import { StoryElementType } from "../Types/StoryElementType";

export default class StoryElementEntity {
  spaceID: ComponentID;
  storyTexts: string[];
  elementModel: LearningElementModel;
  type: StoryElementType;
}
