import ILearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/ILearningRoomPresenter";

export default interface ILearningRoomPort {
  presentNewScore(score: number, completed: boolean, roomId: number): void;
  registerLearningRoomPresenter(
    learningRoomPresenter: ILearningRoomPresenter
  ): void;
}
