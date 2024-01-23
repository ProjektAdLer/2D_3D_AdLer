import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { StoryElementType } from "../../Domain/Types/StoryElementType";

export default class StoryElementTO {
  introStoryTexts: string[] | null;
  outroStoryTexts: string[] | null;
  modelType: LearningElementModel | null;
  storyType: StoryElementType;
}
