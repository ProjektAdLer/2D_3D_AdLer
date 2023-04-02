import IMenuHeaderBarPresenter from "./IMenuHeaderBarPresenter";
import MenuHeaderBarViewModel from "./MenuHeaderBarViewModel";
import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";

export default class MenuHeaderBarPresenter implements IMenuHeaderBarPresenter {
  constructor(private viewModel: MenuHeaderBarViewModel) {}

  onLearningWorldLoaded(world: LearningWorldTO): void {
    this.viewModel.currentWorldName.Value = world.name;
  }
}
