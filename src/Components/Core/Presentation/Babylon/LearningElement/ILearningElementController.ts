import { ActionEvent } from "@babylonjs/core";

export default interface ILearningElementController {
  clicked(event?: ActionEvent): void;
}
