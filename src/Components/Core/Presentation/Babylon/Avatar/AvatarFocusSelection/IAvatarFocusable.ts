import { Vector3 } from "@babylonjs/core";

export default interface IAvatarFokusable {
  get FocusableCenterPosition(): Vector3;
  onFocused?(): void;
  onUnfocused?(): void;
}
