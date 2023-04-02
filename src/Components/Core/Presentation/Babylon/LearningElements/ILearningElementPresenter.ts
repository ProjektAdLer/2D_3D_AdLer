import { Vector3 } from "@babylonjs/core";
import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface ILearningElementPresenter
  extends ILearningWorldAdapter {
  presentLearningElement(
    elementTO: LearningElementTO,
    positions: [Vector3, number]
  ): void;

  onLearningElementScored(hasScored: boolean, elementID: ComponentID): void;
}
