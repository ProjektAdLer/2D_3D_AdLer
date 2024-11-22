import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";
import IAvatarAdapter from "../AvatarPort/IAvatarAdapter";
import { IAbstractPort } from "./IAbstractPort";

export default interface IAvatarPort extends IAbstractPort<IAvatarAdapter> {
  onAvatarConfigChanged(newAvatarConfig: AvatarConfigTO): void;
}
