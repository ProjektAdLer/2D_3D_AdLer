import IMenuHeaderBarPresenter from "./IMenuHeaderBarPresenter";
import MenuHeaderBarViewModel from "./MenuHeaderBarViewModel";
import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";

export default class MenuHeaderBarPresenter implements IMenuHeaderBarPresenter {
  constructor(private viewModel: MenuHeaderBarViewModel) {}

  onWorldLoaded(world: WorldTO): void {
    this.viewModel.currentWorldName.Value = world.name;
  }
}
