export class AvatarTO {
  avatarName: string;
}

export default interface IAvatarPort {
  presentAvatar(avatarTO: AvatarTO): void;
}
