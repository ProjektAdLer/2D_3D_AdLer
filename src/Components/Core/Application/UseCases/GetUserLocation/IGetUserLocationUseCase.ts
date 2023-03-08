import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import UserLocationTO from "../../DataTransferObjects/UserLocationTO";

export default interface IGetUserLocationUseCase
  extends ISynchronousUsecase<void, UserLocationTO> {}
