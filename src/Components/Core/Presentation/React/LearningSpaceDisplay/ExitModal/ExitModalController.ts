import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import IExitModalController from "./IExitModalController";
import history from "history/browser";

export default class ExitModalController implements IExitModalController {
  onExitButtonClicked(): void {
    history.back();
  }
  onSuccessorSpaceClicked(id: ComponentID): void {}
}
