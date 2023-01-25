import { ActionEvent } from "@babylonjs/core";

export default interface IDoorController {
  clicked(event?: ActionEvent): void;
  pointerOver(event?: ActionEvent): void;
  pointerOut(event?: ActionEvent): void;
}
