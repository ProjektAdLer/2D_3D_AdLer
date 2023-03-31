import UserLearningWorldsTO from "src/Components/Core/Application/DataTransferObjects/UserLearningWorldsTO";
import IWorldSelectionPresenter from "./IWorldSelectionPresenter";
import WorldSelectionViewModel from "./WorldSelectionViewModel";

export default class WorldSelectionPresenter
  implements IWorldSelectionPresenter
{
  constructor(private viewModel: WorldSelectionViewModel) {}

  onUserWorldsLoaded(userWorlds: UserLearningWorldsTO): void {
    this.viewModel.userWorlds.Value = [];
    userWorlds.worldInfo.forEach((world) => {
      this.viewModel.userWorlds.Value.push({
        id: world.worldID,
        name: world.worldName,
        isCompleted: false,
      });
    });
  }
}
