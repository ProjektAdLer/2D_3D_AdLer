import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";
import IWorldSelectionPresenter from "./IWorldSelectionPresenter";
import WorldSelectionViewModel from "./WorldSelectionViewModel";

export default class WorldSelectionPresenter
  implements IWorldSelectionPresenter
{
  constructor(private viewModel: WorldSelectionViewModel) {}

  onWorldLoaded(): void {
    // this.viewModel.worlds.Value =
    //   // universeTO.worlds;
    //   [{ id: 1 }, { id: 2 }];
  }

  private worldDataLoaded(worldTO: WorldTO): void {
    // this.viewModel.worlds.Value.forEach((world) => {
    //   let worldData = { world.id, false};
    //   //check with worldTO about completed status
    //   this.viewModel.worldsCompleted.Value.push([{world.id, false}]);
    //   }
    // });
  }
}
