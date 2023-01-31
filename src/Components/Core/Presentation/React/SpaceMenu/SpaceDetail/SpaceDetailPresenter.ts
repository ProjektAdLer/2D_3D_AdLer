import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import ISpaceDetailPresenter from "./ISpaceDetailPresenter";
import SpaceDetailViewModel from "./SpaceDetailViewModel";
import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";
import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";

export default class SpaceDetailPresenter implements ISpaceDetailPresenter {
  constructor(private viewModel: SpaceDetailViewModel) {}

  onWorldLoaded(world: WorldTO): void {
    let newSpaces: [number, string, boolean][] = [];

    world.spaces.forEach((space) => {
      newSpaces.push([space.id, space.name, false]);
    });

    // set all values at once to avoid multiple re-renders
    this.viewModel.spaces.Value = newSpaces;
  }

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: ElementID
  ): void {
    const lookup = this.viewModel.spaces.Value.find(
      (space) => space[0] === spaceID
    );
    if (score >= requiredScore && lookup !== undefined) {
      lookup[2] = true;
    }
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

    this.viewModel.requirements.Value = spaceTO.requirements;
  }
}
