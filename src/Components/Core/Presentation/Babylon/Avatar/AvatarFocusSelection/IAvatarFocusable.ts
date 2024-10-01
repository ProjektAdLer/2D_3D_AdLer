import { Vector3 } from "@babylonjs/core";

export default interface IAvatarFokusable {
  getFocusableCenterPosition(): Vector3;
  onFocused?(): void;
  onUnfocused?(): void;
}
