import { injectable } from "inversify";
import ILearningWorldPort from "../Interfaces/ILearningWorldPort";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import ILearningWorldAdapter from "./ILearningWorldAdapter";
import LearningElementTO from "../../DataTransferObjects/LearningElementTO";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import UserLearningWorldsTO from "../../DataTransferObjects/UserLearningWorldsTO";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";
import LearningSpacePrecursorAndSuccessorTO from "../../DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";
import AdaptivityElementProgressTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import AdaptivityElementProgressUpdateTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";

@injectable()
export default class LearningWorldPort
  extends AbstractPort<ILearningWorldAdapter>
  implements ILearningWorldPort
{
  // userWorlds
  public onUserLearningWorldsLoaded(
    userLearningWorldsTO: UserLearningWorldsTO
  ): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onUserLearningWorldsLoaded)
        adapter.onUserLearningWorldsLoaded(userLearningWorldsTO);
    });
  }
  // world
  public onLearningWorldLoaded(learningWorldTO: LearningWorldTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onLearningWorldLoaded)
        adapter.onLearningWorldLoaded(learningWorldTO);
    });
  }

  public onLearningWorldScored(
    learningWorldScoreTO: LearningWorldScoreTO
  ): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onLearningWorldScored)
        adapter.onLearningWorldScored(learningWorldScoreTO);
    });
  }

  // space
  public onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onLearningSpaceLoaded)
        adapter.onLearningSpaceLoaded(learningSpaceTO);
    });
  }
  public onLearningSpaceScored(
    learningSpaceScoreTO: LearningSpaceScoreTO
  ): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onLearningSpaceScored)
        adapter.onLearningSpaceScored(learningSpaceScoreTO);
    });
  }

  public onLearningSpacePrecursorAndSuccessorLoaded(
    LearningSpacePrecursorAndSuccessorTO: LearningSpacePrecursorAndSuccessorTO
  ): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onLearningSpacePrecursorAndSuccessorLoaded)
        adapter.onLearningSpacePrecursorAndSuccessorLoaded(
          LearningSpacePrecursorAndSuccessorTO
        );
    });
  }

  // element
  public onLearningElementLoaded(
    learningElementStartedTO: LearningElementTO
  ): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onLearningElementLoaded)
        adapter.onLearningElementLoaded(learningElementStartedTO);
    });
  }
  public onLearningElementScored(
    hasScored: boolean,
    learningElementID: ComponentID
  ): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onLearningElementScored)
        adapter.onLearningElementScored(hasScored, learningElementID);
    });
  }
  public onLearningElementHighlighted(learningElementID: ComponentID): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onLearningElementHighlighted)
        adapter.onLearningElementHighlighted(learningElementID);
    });
  }

  // adaptivity
  public onAdaptivityElementLoaded(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onAdaptivityElementLoaded)
        adapter.onAdaptivityElementLoaded(adaptivityElementProgressTO);
    });
  }

  public onAdaptivityElementAnswerEvaluated(
    adaptivityElementProgressUpdateTO: AdaptivityElementProgressUpdateTO
  ): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onAdaptivityElementAnswerEvaluated)
        adapter.onAdaptivityElementAnswerEvaluated(
          adaptivityElementProgressUpdateTO
        );
    });
  }
}
