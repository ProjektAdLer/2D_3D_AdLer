import IScorePanelPresenter from "~ReactComponents/LearningRoomDisplay/ScorePanel/IScorePanelPresenter";
import LearningRoomTO from "../../Application/DataTransportObjects/LearningRoomTO";
import ILearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/ILearningRoomPresenter";

export default interface ILearningRoomPort {
  onRoomDataLoaded(learningRoomTO: LearningRoomTO): void;
  presentNewScore(score: number, completed: boolean, roomId: number): void;
  registerLearningRoomPresenter(
    learningRoomPresenter: ILearningRoomPresenter
  ): void;
  registerScorePanelPresenter(scorePanelPresenter: IScorePanelPresenter): void;
}
