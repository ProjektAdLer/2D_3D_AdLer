import IWorldDetailController from "./IWorldDetailController";
import history from "history/browser";
import WorldDetailViewModel from "./WorldDetailViewModel";
import bind from "bind-decorator";

export default class WorldDetailController implements IWorldDetailController {
  constructor(private viewModel: WorldDetailViewModel) {}

  @bind
  onEnterWorldButtonClicked(): void {
    history.push("/space/" + this.viewModel.id.Value);
  }
}
