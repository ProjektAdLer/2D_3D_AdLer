import { ActionEvent } from "@babylonjs/core";

export default interface IElementController {
  clicked(event?: ActionEvent): void;
  pointerOver(event?: ActionEvent): void;
  pointerOut(event?: ActionEvent): void;
}
