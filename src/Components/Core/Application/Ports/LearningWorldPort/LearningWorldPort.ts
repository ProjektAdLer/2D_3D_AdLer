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
}
