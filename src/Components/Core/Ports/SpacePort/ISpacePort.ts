import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import { IAbstractPort } from "./../AbstractPort/IAbstractPort";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";

export default interface ISpacePort extends IAbstractPort<ISpaceAdapter> {
  onSpaceLoaded(spaceTO: SpaceTO): void;
  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceId: number
  ): void;
}
