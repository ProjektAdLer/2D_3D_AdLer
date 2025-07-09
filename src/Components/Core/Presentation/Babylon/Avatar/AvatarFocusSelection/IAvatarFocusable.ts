import { Vector3 } from "@babylonjs/core";

export enum FocusalbeTypes {
  learningElement = 0,
  storyElement,
  exit,
}

export default interface IAvatarFokusable {
  getFocusableCenterPosition(): Vector3;
  getID?(): { id: number; type: FocusalbeTypes };
  // based on distance
  onFocused?(): void;
  onUnfocused?(): void;
  // based on user interaction
  isSpecialFocused?(): boolean;
  onSpecialFocused?(): void;
  onSpecialUnfocused?(): void;
}
