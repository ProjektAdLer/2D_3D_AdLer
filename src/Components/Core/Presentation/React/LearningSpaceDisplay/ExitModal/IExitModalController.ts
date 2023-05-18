import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface IExitModalController {
  onExitButtonClicked(): void;
  onSuccessorSpaceClicked(id: ComponentID): void;
}
