import { ISynchronousUsecase } from "./../Abstract/ISynchronousUsecase";

export default interface ILearningElementStartedUseCase
  extends ISynchronousUsecase {
  execute(data?: { learningElementId: number }): void;
}
