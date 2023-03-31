import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import IWorldCompletionModalPresenter from "./IWorldCompletionModalPresenter";
import WorldCompletionModalViewModel from "./WorldCompletionModalViewModel";

export default class WorldCompletionModalPresenter
  implements IWorldCompletionModalPresenter
{
  constructor(private viewModel: WorldCompletionModalViewModel) {}

  onWorldLoaded(world: LearningWorldTO): void {
    this.viewModel.showModal.Value = world.spaces.every(
      (space) => space.currentScore >= space.requiredScore
    );
  }
}
