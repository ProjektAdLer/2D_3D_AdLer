import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import { IAbstractPort } from "../../src/Components/Core/Ports/AbstractPort/IAbstractPort";
import SpaceTO from "../../src/Components/Core/Application/DataTransferObjects/SpaceTO";

export default interface ISpacePort extends IAbstractPort<ISpaceAdapter> {
  onSpaceLoaded(spaceTO: SpaceTO): void;
  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceId: number
  ): void;
}
