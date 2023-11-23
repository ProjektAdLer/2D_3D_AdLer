import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { Vector3 } from "@babylonjs/core";

export default interface ILearningElementPresenter
  extends ILearningWorldAdapter {
  onLearningElementScored(hasScored: boolean, elementID: ComponentID): void;
  onAvatarPositionChanged(position: Vector3, interactionRadius: number): void;
}
