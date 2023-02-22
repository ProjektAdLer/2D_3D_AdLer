import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface ISpaceSelectionController {
  onSpaceClicked(spaceID: ComponentID): void;
}
