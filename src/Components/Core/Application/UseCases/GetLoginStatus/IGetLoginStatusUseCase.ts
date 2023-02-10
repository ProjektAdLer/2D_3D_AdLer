import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";

export default interface IGetLoginStatusUseCase
  extends ISynchronousUsecase<void, boolean> {}
