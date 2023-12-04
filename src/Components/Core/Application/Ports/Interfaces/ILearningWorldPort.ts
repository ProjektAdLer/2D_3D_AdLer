import LearningElementTO from "../../DataTransferObjects/LearningElementTO";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import UserInitialLearningWorldsInfoTO from "../../DataTransferObjects/UserInitialLearningWorldsInfoTO";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { IAbstractPort } from "./IAbstractPort";
import ILearningWorldAdapter from "../LearningWorldPort/ILearningWorldAdapter";
import LearningSpacePrecursorAndSuccessorTO from "../../DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";
import AdaptivityElementProgressTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import AdaptivityElementProgressUpdateTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";
import AdaptivityElementHintTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementHintTO";

export default interface ILearningWorldPort
  extends IAbstractPort<ILearningWorldAdapter> {
  //userWorlds
  onUserInitialLearningWorldsInfoLoaded(
    userInitialLearningWorldsInfoTO: UserInitialLearningWorldsInfoTO
  ): void;

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
  onLearningElementHighlighted(learningElementID: ComponentID): void;

  // adaptivity
  onAdaptivityElementLoaded(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): void;
  onAdaptivityElementAnswerEvaluated(
    adaptivityElementProgressUpdateTO: AdaptivityElementProgressUpdateTO
  ): void;
  onAdaptivityElementUserHintInformed(
    adaptivityElementHintTO: AdaptivityElementHintTO
  ): void;
}
