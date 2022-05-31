export class AvatarTO {
  avatarName: string;
  //equipment: object;
}
export default interface IAvatarPort {
  exposeAvatar(avatarTO: AvatarTO): void;
}
