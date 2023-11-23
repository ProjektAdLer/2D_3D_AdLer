import { Vector3 } from "@babylonjs/core";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";

export default interface ILearningSpacePresenter {
  asyncSetupSpace(spaceData: LearningSpaceTO): Promise<void>;
  broadcastAvatarPosition(position: Vector3, interactionRadius: number): void;
}
