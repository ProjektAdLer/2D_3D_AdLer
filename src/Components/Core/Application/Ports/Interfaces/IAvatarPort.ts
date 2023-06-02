import AvatarTO from "../../DataTransferObjects/AvatarTO";

export default interface IAvatarPort {
  presentAvatar(avatarTO: AvatarTO): void;
}
