import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface IHandleStoryNPCExitUseCase
  extends IAsyncUsecase<{ storyType: StoryElementType }, void> {}
