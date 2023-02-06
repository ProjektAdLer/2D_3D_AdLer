import { Vector3 } from "@babylonjs/core";
import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";
import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";

export default interface IElementPresenter extends IWorldAdapter {
  presentElement(elementTO: ElementTO, positions: [Vector3, number]): void;

  onElementScored(hasScored: boolean, elementID: number): void;
}
