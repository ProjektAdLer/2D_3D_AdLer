import { Vector3 } from "@babylonjs/core";

export enum FocusableTypes {
  learningElement = 0,
  introStory,
  outroStory,
  entryDoor,
  exitDoor,
}

export default interface IAvatarFokusable {
  getFocusableCenterPosition(): Vector3;
  getID?(): { id: number; type: FocusableTypes };
  getType?(): { type: FocusableTypes };
  // based on distance
  onFocused?(): void;
  onUnfocused?(): void;
  // based on user interaction
  isSpecialFocused?(): boolean;
  onSpecialFocused?(): void;
  onSpecialUnfocused?(): void;
}
