import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import ISpaceDetailPresenter from "./ISpaceDetailPresenter";
import SpaceDetailViewModel, {
  SpaceDetailSpaceData,
} from "./SpaceDetailViewModel";
import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";

export default class SpaceDetailPresenter implements ISpaceDetailPresenter {
  constructor(private viewModel: SpaceDetailViewModel) {}

  onWorldLoaded(world: WorldTO): void {
    let newSpaces: SpaceDetailSpaceData[] = [];

    world.spaces.forEach((space) => {
      newSpaces.push({
        id: space.id,
        name: space.name,
        isCompleted: space.currentScore >= space.requiredScore,
      });
    });

    // set all values at once to avoid multiple re-renders
    this.viewModel.spaces.Value = newSpaces;
  }

  onSpaceLoaded(spaceTO: SpaceTO): void {
    this.viewModel.id.Value = spaceTO.id;

    this.viewModel.name.Value = spaceTO.name;

    this.viewModel.description.Value = spaceTO.description;

    this.viewModel.goals.Value = spaceTO.goals;

    this.viewModel.elements.Value = spaceTO.elements.map((elementTO) => [
      elementTO.type,
      elementTO.name,
      elementTO.hasScored,
      elementTO.value,
    ]);

    this.viewModel.requiredPoints.Value = spaceTO.requiredScore;

    // this.viewModel.requirements.Value = spaceTO.requirements;
  }
}
