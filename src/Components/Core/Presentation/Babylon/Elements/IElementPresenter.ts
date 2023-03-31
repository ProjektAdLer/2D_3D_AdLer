import { Vector3 } from "@babylonjs/core";
import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import IWorldAdapter from "src/Components/Core/Application/Ports/WorldPort/IWorldAdapter";

export default interface IElementPresenter extends IWorldAdapter {
  presentElement(
    elementTO: LearningElementTO,
    positions: [Vector3, number]
  ): void;

  onElementScored(hasScored: boolean, elementID: ComponentID): void;
}
