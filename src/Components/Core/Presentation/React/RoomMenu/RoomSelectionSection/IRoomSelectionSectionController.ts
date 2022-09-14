import { LearningComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface IRoomSelectionSectionController {
  onRoomRowClicked(roomId: LearningComponentID): void;
}
