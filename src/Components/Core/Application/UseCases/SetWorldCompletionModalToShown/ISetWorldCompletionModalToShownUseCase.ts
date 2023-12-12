import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";

export default interface ISetWorldCompletionModalToShownUseCase
  extends ISynchronousUsecase<{ worldID: number }, void> {}
