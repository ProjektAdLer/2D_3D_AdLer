import LearningElementTO from "../../DataTransferObjects/LearningElementTO";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import UserLearningWorldsTO from "../../DataTransferObjects/UserLearningWorldsTO";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { IAbstractPort } from "./IAbstractPort";
import IWorldAdapter from "../WorldPort/IWorldAdapter";

export default interface IWorldPort extends IAbstractPort<IWorldAdapter> {
  //userWorlds
  onUserWorldsLoaded(userWorldsTO: UserLearningWorldsTO): void;
  // world
  onWorldLoaded(worldTO: LearningWorldTO): void;

  onWorldScored(worldScoreTO: LearningWorldScoreTO): void;

  // space
  onSpaceLoaded(spaceTO: LearningSpaceTO): void;
  onSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void;

  // element
  onElementLoaded(elementStartedTO: LearningElementTO): void;
  onElementScored(hasScored: boolean, elementID: ComponentID): void;
}
