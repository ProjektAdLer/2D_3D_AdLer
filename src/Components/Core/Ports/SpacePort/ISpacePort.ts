import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import ISpacePresenter from "../../Presentation/Babylon/Spaces/ISpacePresenter";

export default interface ISpacePort {
  onSpaceDataLoaded(spaceTO: SpaceTO): void;
  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceId: number
  ): void;
  registerSpacePresenter(spacePresenter: ISpacePresenter): void;
}
