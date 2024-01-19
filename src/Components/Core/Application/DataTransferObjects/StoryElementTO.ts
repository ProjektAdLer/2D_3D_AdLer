import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { StoryElementType } from "../../Domain/Types/StoryElementType";

export default class StoryElementTO {
  storyTexts: string[];
  storyType: StoryElementType;
  modelType: LearningElementModel;
}
