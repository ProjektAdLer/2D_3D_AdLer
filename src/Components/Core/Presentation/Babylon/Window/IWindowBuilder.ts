import { Vector3 } from "@babylonjs/core";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";

export default interface IWindowBuilder extends IAsyncPresentationBuilder {
  position: Vector3;
  rotation: number;
}
