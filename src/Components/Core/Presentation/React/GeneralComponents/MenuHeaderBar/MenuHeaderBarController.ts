import { logger } from "src/Lib/Logger";
import IMenuHeaderBarController from "./IMenuHeaderBarController";
import history from "history/browser";
import { debug } from "console";

export default class MenuHeaderBarController
  implements IMenuHeaderBarController
{
  onMenuButtonClicked(): void {
    logger.warn(
      "Menu button functionality not implemented. Current functionality is mock only."
    );

    history.push("/");
  }
  onLearningWorldButtonClicked(): void {
    logger.warn(
      "Menu button functionality not implemented. Current functionality is mock only."
    );

    history.push("/worldmenu");
  }

  onBackButtonClicked(): void {
    history.back();
  }
}
