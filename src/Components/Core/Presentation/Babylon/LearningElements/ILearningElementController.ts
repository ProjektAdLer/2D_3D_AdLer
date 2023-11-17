import { ActionEvent } from "@babylonjs/core";

export default interface ILearningElementController {
  picked(event?: ActionEvent): void;
  pointerOver(event?: ActionEvent): void;
  pointerOut(event?: ActionEvent): void;
}
