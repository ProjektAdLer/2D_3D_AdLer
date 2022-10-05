import { logger } from "src/Lib/Logger";
import IDetailSectionController from "./IDetailSectionController";
import history from "history/browser";

export default class DetailSectionController
  implements IDetailSectionController
{
  onSpaceButtonClicked(): void {
    logger.warn("Space button functionality not yet implemented.");

    history.push("/space");
  }
}
