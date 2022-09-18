import { logger } from "src/Lib/Logger";
import IHeaderBarController from "./IHeaderBarController";

export default class HeaderBarController implements IHeaderBarController {
  onMenuButtonClicked(): void {
    logger.warn("Menu button functionality not implemented.");
  }
  onBackButtonClicked(): void {
    logger.warn("Back button functionality not implemented.");
  }
}
