import ILearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/ILearningRoomPresenter";

export default interface ILearningRoomPort {
  addLearningRoomPresenter(learningRoomPresenter: ILearningRoomPresenter): void;
  presentNewScore(score: number, completed: boolean, roomId: number): void;
}
