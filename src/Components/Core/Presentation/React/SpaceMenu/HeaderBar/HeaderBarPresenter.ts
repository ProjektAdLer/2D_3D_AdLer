import IHeaderBarPresenter from "./IHeaderBarPresenter";
import HeaderBarViewModel from "./HeaderBarViewModel";
import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";

export default class HeaderBarPresenter implements IHeaderBarPresenter {
  constructor(private viewModel: HeaderBarViewModel) {}

  onWorldLoaded(world: WorldTO): void {
    this.viewModel.title.Value = world.worldName;
  }
}
