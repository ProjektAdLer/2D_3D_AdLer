import SpaceTO from "../../src/Components/Core/Application/DataTransferObjects/SpaceTO";
import { ElementID } from "../../src/Components/Core/Domain/Types/EntityTypes";

export default interface ISpaceAdapter {
  onSpaceLoaded(spaceTO: SpaceTO): void;
  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: ElementID
  ): void;
}
