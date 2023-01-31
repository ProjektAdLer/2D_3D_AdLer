import ISpaceDetailController from "./ISpaceDetailController";
import history from "history/browser";
import SpaceDetailViewModel from "./SpaceDetailViewModel";
import bind from "bind-decorator";

export default class SpaceDetailController implements ISpaceDetailController {
  constructor(private viewModel: SpaceDetailViewModel) {}

  @bind
  onSpaceButtonClicked(): void {
    history.push("/space/" + this.viewModel.id.Value);
  }
}
