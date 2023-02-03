import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface IWorldSelectionController {
  onWorldRowClicked(spaceId: ElementID): void;
}
