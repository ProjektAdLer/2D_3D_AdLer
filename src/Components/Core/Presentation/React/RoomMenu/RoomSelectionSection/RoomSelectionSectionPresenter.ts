import LearningWorldTO from "src/Components/Core/Application/DataTransportObjects/LearningWorldTO";
import ILearningWorldAdapter from "src/Components/Core/Ports/LearningWorldPort/ILearningWorldAdapter";
import IRoomSelectionSectionPresenter from "./IRoomSelectionSectionPresenter";
import RoomSelectionSectionViewModel from "./RoomSelectionSectionViewModel";

export default class RoomSelectionSectionPresenter
  implements IRoomSelectionSectionPresenter, ILearningWorldAdapter
{
  constructor(private viewModel: RoomSelectionSectionViewModel) {}

  onLearningWorldLoaded(world: LearningWorldTO): void {
    let newRoomIDs: number[] = [];
    let newRoomTitles: string[] = [];

    world.learningRooms.forEach((learningRoom) => {
      newRoomIDs.push(learningRoom.id);
      newRoomTitles.push(learningRoom.name);
    });

    // set all values at once to avoid multiple re-renders
    this.viewModel.roomIDs.Value = newRoomIDs;
    this.viewModel.roomTitles.Value = newRoomTitles;
  }
}
