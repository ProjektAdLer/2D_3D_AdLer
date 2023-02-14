import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface IWorldSelectionController {
  onWorldRowClicked(spaceId: ComponentID): void;
}
