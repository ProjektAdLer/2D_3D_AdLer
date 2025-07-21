import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";

export default interface IStoryNPCBuilder extends IAsyncPresentationBuilder {
  modelType: string;
  storyType: StoryElementType;
  storyNpcName: string | null;
  noLearningElementHasScored: boolean;
  learningSpaceCompleted: boolean;
  learningSpaceTemplateType: LearningSpaceTemplateType;
  exitAfterIntro: boolean | null;
  exitAfterOutro: boolean | null;
}
