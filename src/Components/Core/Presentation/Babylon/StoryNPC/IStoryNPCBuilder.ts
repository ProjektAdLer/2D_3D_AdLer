import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";

export default interface IStoryNPCBuilder extends IAsyncPresentationBuilder {
  modelType: string;
  storyType: StoryElementType;
}
