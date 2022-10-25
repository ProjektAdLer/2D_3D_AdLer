import history from "history/browser";
import IMenuBarController from "./IMenuBarController";

export default class MenuBarController implements IMenuBarController {
  onExitButtonClicked(): void {
    history.back();
  }
}
