import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";

export default interface ILoadStoryElementUseCase
  extends ISynchronousUsecase<StoryElementType, void> {}
