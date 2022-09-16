import { ISynchronousUsecase } from "./../Abstract/ISynchronousUsecase";

export default interface ILearningElementStartedUseCase
  extends ISynchronousUsecase<{ learningElementId: number }> {
  execute(data?: { learningElementId: number }): void;
}
