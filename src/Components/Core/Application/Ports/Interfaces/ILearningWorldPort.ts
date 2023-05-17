import LearningElementTO from "../../DataTransferObjects/LearningElementTO";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import UserLearningWorldsTO from "../../DataTransferObjects/UserLearningWorldsTO";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { IAbstractPort } from "./IAbstractPort";
import ILearningWorldAdapter from "../LearningWorldPort/ILearningWorldAdapter";
import LearningSpacePrecursorAndSuccessorTO from "../../DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";

export default interface ILearningWorldPort
  extends IAbstractPort<ILearningWorldAdapter> {
  //userWorlds
  onUserLearningWorldsLoaded(userLearningWorldsTO: UserLearningWorldsTO): void;
  // world
  onLearningWorldLoaded(learningWorldTO: LearningWorldTO): void;

  onLearningWorldScored(learningWorldScoreTO: LearningWorldScoreTO): void;

  // space
  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void;
  onLearningSpaceScored(learningSpaceScoreTO: LearningSpaceScoreTO): void;
  onLearningSpacePrecursorAndSuccessorLoaded(
    LearningSpacePrecursorAndSuccessorTO: LearningSpacePrecursorAndSuccessorTO
  ): void;

  // element
  onLearningElementLoaded(learningElementStartedTO: LearningElementTO): void;
  onLearningElementScored(
    hasScored: boolean,
    learningElementID: ComponentID
  ): void;
}
