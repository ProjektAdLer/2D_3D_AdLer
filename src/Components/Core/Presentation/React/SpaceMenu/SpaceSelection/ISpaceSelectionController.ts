import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface ISpaceSelectionController {
  onSpaceRowClicked(spaceID: ComponentID): void;
}
