import LearningWorldTO from "src/Components/Core/Application/DataTransportObjects/LearningWorldTO";
import ILearningWorldAdapter from "src/Components/Core/Ports/LearningWorldPort/ILearningWorldAdapter";
import ILearningRoomSelectionPresenter from "./ILearningRoomSelectionPresenter";
import LearningRoomSelectionViewModel from "./LearningRoomSelectionViewModel";

export default class LearningRoomSelectionPresenter
  implements ILearningRoomSelectionPresenter, ILearningWorldAdapter
{
  constructor(private viewModel: LearningRoomSelectionViewModel) {}

  onLearningWorldLoaded(learningWorld: LearningWorldTO): void {
    let newLearningRoomIDs: number[] = [];
    let newLearningRoomTitles: string[] = [];

    learningWorld.learningRooms.forEach((learningRoom) => {
      newLearningRoomIDs.push(learningRoom.id);
      newLearningRoomTitles.push(learningRoom.name);
    });

    // set all values at once to avoid multiple re-renders
    this.viewModel.learningRoomIDs.Value = newLearningRoomIDs;
    this.viewModel.learningRoomTitles.Value = newLearningRoomTitles;
  }
}
