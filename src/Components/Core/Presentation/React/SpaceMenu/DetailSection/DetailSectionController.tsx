import { logger } from "src/Lib/Logger";
import IDetailSectionController from "./IDetailSectionController";
import history from "history/browser";
import DetailSectionViewModel from "./DetailSectionViewModel";
import bind from "bind-decorator";

export default class DetailSectionController
  implements IDetailSectionController
{
  constructor(private viewModel: DetailSectionViewModel) {}

  @bind
  onSpaceButtonClicked(): void {
    history.push("/space/" + this.viewModel.id.Value);
  }
}
