import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";

/**
 * Use case to set the user location in the user entity
 * Any id thats not provided will be set to undefined
 */
export default interface ISetUserLocationUseCase
  extends ISynchronousUsecase<{ worldID?: number; spaceID?: number }, void> {}
