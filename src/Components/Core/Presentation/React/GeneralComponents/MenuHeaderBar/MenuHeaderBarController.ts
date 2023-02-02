import { logger } from "src/Lib/Logger";
import IMenuHeaderBarController from "./IMenuHeaderBarController";
import history from "history/browser";

export default class MenuHeaderBarController
  implements IMenuHeaderBarController
{
  onMenuButtonClicked(): void {
    logger.warn(
      "Menu button functionality not implemented. Current functionality is mock only."
    );

    history.push("/");
  }
  onBackButtonClicked(): void {
    history.back();
  }
}
