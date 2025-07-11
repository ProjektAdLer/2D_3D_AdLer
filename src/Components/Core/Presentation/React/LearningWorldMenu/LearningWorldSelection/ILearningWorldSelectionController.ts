import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface ILearningWorldSelectionController {
  onLearningWorldRowClicked(spaceID: ComponentID): void;
  onLearningWorldRowDoubleClicked(spaceID: ComponentID): void;
}
