import LearningElementTO from "../../DataTransferObjects/LearningElementTO";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";
import UserLearningWorldsTO from "../../DataTransferObjects/UserLearningWorldsTO";
import { ComponentID } from "../../../Domain/Types/EntityTypes";

/**
 * This interface is used to register with the WorldPort and defines all the methods that can be called by the WorldPort.
 */
export default interface IWorldAdapter {
  // userWorlds
  onUserWorldsLoaded?(userWorldsTO: UserLearningWorldsTO): void;

  // world
  onWorldLoaded?(world: LearningWorldTO): void;
  onWorldScored?(worldScoreTO: LearningWorldScoreTO): void;

  // space
  onSpaceLoaded?(spaceTO: LearningSpaceTO): void;
  onSpaceScored?(spaceScoreTO: LearningSpaceScoreTO): void;

  // element
  onElementLoaded?(elementTO: LearningElementTO): void;
  onElementScored?(hasScored: boolean, elementID: ComponentID): void;
}
