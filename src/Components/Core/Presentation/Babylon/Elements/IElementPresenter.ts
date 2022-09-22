import { Vector3 } from "@babylonjs/core";
import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";

export default interface IElementPresenter {
  presentElement(elementTO: ElementTO, positions: [Vector3, number]): void;
}
