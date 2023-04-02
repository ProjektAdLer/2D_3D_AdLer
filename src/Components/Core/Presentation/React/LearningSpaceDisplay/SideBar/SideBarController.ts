import history from "history/browser";
import ISideBarController from "./ISideBarController";

export default class SideBarController implements ISideBarController {
  onExitButtonClicked(): void {
    history.back();
  }
}
