import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";

export default interface IAvatarAdapter {
  onAvatarConfigChanged?(
    newAvatarConfig: AvatarConfigTO,
    avatarConfigDiff: Partial<AvatarConfigTO>,
  ): void;
}
