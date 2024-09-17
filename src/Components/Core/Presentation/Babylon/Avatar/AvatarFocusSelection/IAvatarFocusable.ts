import { Vector3 } from "@babylonjs/core";

export default interface IAvatarFokusable {
  get Position(): Vector3;
  onFocused?(): void;
  onUnfocused?(): void;
}
