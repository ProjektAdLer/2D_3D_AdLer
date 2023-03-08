import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";

export default interface ISetUserLocationUseCase
  extends ISynchronousUsecase<{ worldID: number; spaceID?: number }, void> {}
