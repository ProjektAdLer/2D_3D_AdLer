import { ActionEvent } from "@babylonjs/core";

interface IAccessibilityControls {
  accessibilityPicked(): void;
}

export default interface ILearningElementController
  extends IAccessibilityControls {
  picked(event?: ActionEvent): void;
  pointerOver(event?: ActionEvent): void;
  pointerOut(event?: ActionEvent): void;
}
