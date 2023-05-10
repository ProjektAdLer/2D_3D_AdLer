import { logger } from "src/Lib/Logger";
import IMenuHeaderBarController from "./IMenuHeaderBarController";
import history from "history/browser";

export default class MenuHeaderBarController
  implements IMenuHeaderBarController
{
  onMenuButtonClicked(): void {
    history.push("/");
  }

  onLearningWorldButtonClicked(): void {
    history.push("/worldmenu");
  }

  onBackButtonClicked(): void {
    history.back();
  }
}
