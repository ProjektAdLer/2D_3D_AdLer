import { injectable } from "inversify";
import ILearningRoomPort, { LearningElementTO } from "./ILearningRoomPort";
import LearningRoomViewModel from "./LearningRoomViewModel";

@injectable()
export default class LearningRoomPresenter implements ILearningRoomPort {
  private viewModel: LearningRoomViewModel;

  public set ViewModel(viewModel: LearningRoomViewModel) {
    this.viewModel = viewModel;
  }

  presentLearningRoom(learningRoomTO: LearningRoomTO): void {}
}
