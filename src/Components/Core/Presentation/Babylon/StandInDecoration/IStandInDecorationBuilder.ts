import { Vector3 } from "@babylonjs/core";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
export default interface IStandInDecorationBuilder
  extends IAsyncPresentationBuilder {
  position: Vector3;
  rotation: number;
  spaceName: string;
  slotNumber: number;
}
