import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";
import IWorldDetailPresenter from "./IWorldDetailPresenter";
import WorldDetailViewModel, {
  WorldDetailSpaceData,
} from "./WorldDetailViewModel";

export default class WorldDetailPresenter implements IWorldDetailPresenter {
  constructor(private viewModel: WorldDetailViewModel) {}
  onWorldLoaded(world: WorldTO): void {
    let spaces: WorldDetailSpaceData[] = [];

    world.spaces.forEach((space) => {
      spaces.push({
        id: space.id,
        name: space.name,
        isCompleted: space.currentScore >= space.requiredScore,
      });
    });

    this.viewModel.spaces.Value = spaces;
    this.viewModel.name.Value = world.name;
    this.viewModel.description.Value = world.description;
    this.viewModel.goals.Value = world.goal;
  }
}
