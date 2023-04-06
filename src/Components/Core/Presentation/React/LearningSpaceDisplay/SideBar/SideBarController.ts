import history from "history/browser";
import ISideBarController from "./ISideBarController";

export default class SideBarController implements ISideBarController {
  onMainMenuButtonClicked(): void {
    history.push("/");
  }
  onWorldMenuButtonClicked(): void {
    history.push("/worldmenu");
  }
  onSpaceMenuButtonClicked(): void {
    history.push("/spacemenu");
  }
}
