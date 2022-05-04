import { injectable } from "inversify";
import ILearningRoomPort, { LearningElementTO } from "./ILearningRoomPort";
import RoomViewModel from "./LearningRoomViewModel";

@injectable()
export default class LearningRoomPresenter implements ILearningRoomPort {
  private viewModels: RoomViewModel[] = new Array<RoomViewModel>();

  addLearningElement(learningElementTO: LearningElementTO): void {
    this.viewModels
      .find((vm) => vm.id === learningElementTO.roomId)
      ?.learningElements.Value.push(learningElementTO);
  }
}
