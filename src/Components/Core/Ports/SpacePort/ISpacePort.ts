import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import { IAbstractPort } from "./../AbstractPort/IAbstractPort";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import ISpacePresenter from "../../Presentation/Babylon/Spaces/ISpacePresenter";

export default interface ISpacePort extends IAbstractPort<ISpaceAdapter> {
  onSpaceDataLoaded(spaceTO: SpaceTO): void;
  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceId: number
  ): void;
  registerSpacePresenter(spacePresenter: ISpacePresenter): void;
}
