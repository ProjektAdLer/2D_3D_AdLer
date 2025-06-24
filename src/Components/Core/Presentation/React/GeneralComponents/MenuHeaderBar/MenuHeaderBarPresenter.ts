import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";
import PointBasedDisplay from "../../../Utils/ElementCompletionDisplay/PointBasedDisplay";
import IMenuHeaderBarPresenter from "./IMenuHeaderBarPresenter";
import MenuHeaderBarViewModel from "./MenuHeaderBarViewModel";

export default class MenuHeaderBarPresenter implements IMenuHeaderBarPresenter {
  constructor(private viewModel: MenuHeaderBarViewModel) {}

  onLearningWorldLoaded(world: LearningWorldTO): void {
    this.viewModel.currentWorldName.Value = world.name;
    if (world.gradingStyle instanceof PointBasedDisplay) {
      this.viewModel.gradingStyle.Value = GradingStyle.point;
    } else {
      this.viewModel.gradingStyle.Value = GradingStyle.requirement;
    }
  }
}
