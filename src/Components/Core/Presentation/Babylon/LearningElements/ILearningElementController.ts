import { ActionEvent } from "@babylonjs/core";

export default interface ILearningElementController {
  picked(event?: ActionEvent): void;
  doublePicked(): void;
  pointerOver(event?: ActionEvent): void;
  pointerOut(event?: ActionEvent): void;
}
