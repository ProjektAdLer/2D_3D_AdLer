import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";

export default interface IBeginStoryElementOutroCutSceneUseCase
  extends ISynchronousUsecase<{ scoredLearningElementID: number }, void> {}
