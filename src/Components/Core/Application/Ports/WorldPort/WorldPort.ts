import { injectable } from "inversify";
import IWorldPort from "../Interfaces/IWorldPort";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import IWorldAdapter from "./IWorldAdapter";
import LearningElementTO from "../../DataTransferObjects/LearningElementTO";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import UserLearningWorldsTO from "../../DataTransferObjects/UserLearningWorldsTO";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";

@injectable()
export default class WorldPort
  extends AbstractPort<IWorldAdapter>
  implements IWorldPort
{
  // userWorlds
  public onUserWorldsLoaded(userWorldsTO: UserLearningWorldsTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onUserWorldsLoaded) adapter.onUserWorldsLoaded(userWorldsTO);
    });
  }
  // world
  public onWorldLoaded(worldTO: LearningWorldTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onWorldLoaded) adapter.onWorldLoaded(worldTO);
    });
  }

  public onWorldScored(worldScoreTO: LearningWorldScoreTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onWorldScored) adapter.onWorldScored(worldScoreTO);
    });
  }

  // space
  public onSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onSpaceLoaded) adapter.onSpaceLoaded(spaceTO);
    });
  }
  public onSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onSpaceScored) adapter.onSpaceScored(spaceScoreTO);
    });
  }

  // element
  public onElementLoaded(elementStartedTO: LearningElementTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onElementLoaded) adapter.onElementLoaded(elementStartedTO);
    });
  }
  public onElementScored(hasScored: boolean, elementID: ComponentID): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onElementScored)
        adapter.onElementScored(hasScored, elementID);
    });
  }
}
