import AvatarConfigTO from "../../Application/DataTransferObjects/AvatarConfigTO";
import IAvatarAdapter from "../../Application/Ports/AvatarPort/IAvatarAdapter";

export default interface IAvatarEditorPresenter extends IAvatarAdapter {
  onAvatarConfigLoaded(avatarConfig: AvatarConfigTO): void;
}
