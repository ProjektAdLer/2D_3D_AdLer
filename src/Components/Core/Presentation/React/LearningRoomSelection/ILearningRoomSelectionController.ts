import { LearningComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface ILearningRoomSelectionController {
  onLearningRoomRowClicked(learningRoomId: LearningComponentID): void;
}
