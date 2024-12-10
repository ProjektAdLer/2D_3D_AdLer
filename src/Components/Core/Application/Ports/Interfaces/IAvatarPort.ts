import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";
import IAvatarAdapter from "../AvatarPort/IAvatarAdapter";
import { IAbstractPort } from "./IAbstractPort";

export default interface IAvatarPort extends IAbstractPort<IAvatarAdapter> {
  onAvatarConfigLoaded(avatarConfig: AvatarConfigTO): void;
  onAvatarConfigChanged(
    newAvatarConfig: AvatarConfigTO,
    avatarConfigDiff: Partial<AvatarConfigTO>,
  ): void;
}
