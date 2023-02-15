import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import UserLocationTO from "../../DataTransferObjects/UserLocationTO";

export default interface IGetCurrentUserLocationUseCase
  extends ISynchronousUsecase<void, UserLocationTO> {}
