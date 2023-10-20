import LearningElementTO from "../../DataTransferObjects/LearningElementTO";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";
import UserLearningWorldsTO from "../../DataTransferObjects/UserLearningWorldsTO";
import LearningSpacePrecursorAndSuccessorTO from "../../DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import AdaptivityElementProgressTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import AdaptivityElementProgressUpdateTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";

/**
 * This interface is used to register with the WorldPort and defines all the methods that can be called by the WorldPort.
 */
export default interface ILearningWorldAdapter {
  // userWorlds
  onUserLearningWorldsLoaded?(userLearningWorldsTO: UserLearningWorldsTO): void;

  // world
  onLearningWorldLoaded?(learningWorldTO: LearningWorldTO): void;
  onLearningWorldScored?(learningWorldScoreTO: LearningWorldScoreTO): void;

  // space
  onLearningSpaceLoaded?(learningSpaceTO: LearningSpaceTO): void;
  onLearningSpaceScored?(learningSpaceScoreTO: LearningSpaceScoreTO): void;
  onLearningSpacePrecursorAndSuccessorLoaded?(
    LearningSpacePrecursorAndSuccessorTO: LearningSpacePrecursorAndSuccessorTO
  ): void;

  // element
  onLearningElementLoaded?(learningElementTO: LearningElementTO): void;
  onLearningElementScored?(
    hasScored: boolean,
    learningElementID: ComponentID
  ): void;
  onLearningElementHighlighted?(learningElementID: ComponentID): void;

  // adaptivity
  onAdaptivityElementLoaded?(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): void;
  onAdaptivityElementAnswerEvaluated?(
    adaptivityElementProgressUpdateTO: AdaptivityElementProgressUpdateTO
  ): void;
}
