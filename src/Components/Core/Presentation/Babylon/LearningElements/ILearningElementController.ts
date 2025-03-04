import { ActionEvent } from "@babylonjs/core";
import IAccessibilityControls from "../IAccessibilityControls";

export default interface ILearningElementController
  extends IAccessibilityControls {
  picked(event?: ActionEvent): void;
  pointerOver(event?: ActionEvent): void;
  pointerOut(event?: ActionEvent): void;
}
