import AvatarConfigTO from "../../Application/DataTransferObjects/AvatarConfigTO";

export default interface IAvatarEditorController {
  onAvatarConfigChanged(changes: Partial<AvatarConfigTO>): void;
  saveAvatarConfig(): void;
  resetAvatarConfig(): void;
  randomizeAvatarConfig(): void;
}
