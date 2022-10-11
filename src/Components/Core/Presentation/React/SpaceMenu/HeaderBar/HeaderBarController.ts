import { logger } from "src/Lib/Logger";
import IHeaderBarController from "./IHeaderBarController";
import history from "history/browser";

export default class HeaderBarController implements IHeaderBarController {
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
