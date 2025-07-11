import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface ILearningSpaceSelectionController {
  onLearningSpaceClicked(spaceID: ComponentID): void;
  onLearningSpaceDoubleClicked(spaceID: ComponentID): void;
}
