import ISpacePort from "./ISpacePort";
import { injectable } from "inversify";
import SpaceTO from "../../src/Components/Core/Application/DataTransferObjects/SpaceTO";
import AbstractPort from "../../src/Components/Core/Ports/AbstractPort/AbstractPort";
import ISpaceAdapter from "./ISpaceAdapter";

@injectable()
export default class SpacePort
  extends AbstractPort<ISpaceAdapter>
  implements ISpacePort
{
  onSpaceLoaded(spaceTO: SpaceTO): void {
    this.adapters.forEach((adapter) => {
      adapter.onSpaceLoaded(spaceTO);
    });
  }

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceId: number
  ): void {
    this.adapters.forEach((adapter) => {
      adapter.onScoreChanged(score, requiredScore, maxScore, spaceId);
    });
  }
}
