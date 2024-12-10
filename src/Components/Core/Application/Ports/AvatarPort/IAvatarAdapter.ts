import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";

export default interface IAvatarAdapter {
  onAvatarConfigLoaded?(avatarConfig: AvatarConfigTO): void;
  onAvatarConfigChanged?(
    newAvatarConfig: AvatarConfigTO,
    avatarConfigDiff: Partial<AvatarConfigTO>,
  ): void;
}
