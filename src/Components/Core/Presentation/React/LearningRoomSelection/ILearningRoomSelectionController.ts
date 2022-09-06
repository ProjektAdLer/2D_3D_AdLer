import { LearningComponentID } from "src/Components/Core/Types/EnitityTypes";

export default interface ILearningRoomSelectionController {
  onLearningRoomRowClicked(learningRoomId: LearningComponentID): void;
}
