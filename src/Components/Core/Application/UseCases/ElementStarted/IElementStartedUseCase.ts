import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";

export default interface IElementStartedUseCase
  extends ISynchronousUsecase<{ elementId: number }> {
  execute(data?: { elementId: number }): void;
}
