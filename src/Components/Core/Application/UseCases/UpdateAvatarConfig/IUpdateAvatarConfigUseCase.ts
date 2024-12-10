import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";
import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";

export default interface IUpdateAvatarConfigUseCase
  extends IAsyncUsecase<Partial<AvatarConfigTO>, void> {}
