import IScorePanelPresenter from "~ReactComponents/SpaceDisplay/ScorePanel/IScorePanelPresenter";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import ISpacePresenter from "../../Presentation/Babylon/Spaces/ISpacePresenter";

export default interface ISpacePort {
  onSpaceDataLoaded(spaceTO: SpaceTO): void;
  presentNewScore(score: number, completed: boolean, spaceId: number): void;
  registerSpacePresenter(spacePresenter: ISpacePresenter): void;
  registerScorePanelPresenter(scorePanelPresenter: IScorePanelPresenter): void;
}
