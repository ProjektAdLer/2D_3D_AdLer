import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import { ElementID } from "../../Domain/Types/EntityTypes";

export default interface ISpaceAdapter {
  onSpaceDataLoaded(spaceTO: SpaceTO): void;
  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: ElementID
  ): void;
}
