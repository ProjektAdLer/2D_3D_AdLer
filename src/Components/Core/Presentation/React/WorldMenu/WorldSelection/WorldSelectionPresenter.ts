import UserWorldsTO from "src/Components/Core/Application/DataTransferObjects/UserWorldsTO";
import IWorldSelectionPresenter from "./IWorldSelectionPresenter";
import WorldSelectionViewModel from "./WorldSelectionViewModel";

export default class WorldSelectionPresenter
  implements IWorldSelectionPresenter
{
  constructor(private viewModel: WorldSelectionViewModel) {}

  onUserWorldsLoaded(userWorlds: UserWorldsTO): void {
    this.viewModel.userWorlds.Value = [];
    userWorlds.worldInfo.forEach((world) => {
      this.viewModel.userWorlds.Value.push({
        id: world[0],
        name: world[1],
        isCompleted: false,
      });
    });
  }
}
