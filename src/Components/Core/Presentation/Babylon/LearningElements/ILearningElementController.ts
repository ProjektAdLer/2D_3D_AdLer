import { ActionEvent } from "@babylonjs/core";

export default interface ILearningElementController {
  picked( overrideIsInteractable?: boolean): void;
  pointerOver(event?: ActionEvent): void;
  pointerOut(event?: ActionEvent): void;
}
