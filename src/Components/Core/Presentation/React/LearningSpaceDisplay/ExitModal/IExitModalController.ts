import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface IExitModalController {
  onExitButtonClicked(): void;
  onPrecursorOrSuccessorSpaceClicked(id: ComponentID): void;
}
