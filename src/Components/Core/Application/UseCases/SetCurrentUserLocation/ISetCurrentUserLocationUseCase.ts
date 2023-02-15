import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";

export default interface ISetCurrentUserLocationUseCase
  extends ISynchronousUsecase<{ worldID: number; spaceID?: number }, void> {}
