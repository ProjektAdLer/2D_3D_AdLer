import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface ISpaceSelectionController {
  onSpaceRowClicked(spaceId: ComponentID): void;
}
