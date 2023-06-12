import { Vector3 } from "@babylonjs/core";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface IDoorPresenter {
  presentDoor(
    position: [Vector3, number],
    isExit: boolean,
    spaceID: ComponentID
  ): void;
  openDoor(): void;
  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void;
}
