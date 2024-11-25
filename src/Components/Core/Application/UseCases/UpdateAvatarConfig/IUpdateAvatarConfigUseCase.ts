import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";

export default interface IUpdateAvatarConfigUseCase
  extends ISynchronousUsecase<Partial<AvatarConfigTO>, void> {}
