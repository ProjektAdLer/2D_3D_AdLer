import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import UserLocationTO from "../../DataTransferObjects/UserLocationTO";

export default interface IGetNarrativeFrameworkInfoUseCase
  extends ISynchronousUsecase<void, void> {}
