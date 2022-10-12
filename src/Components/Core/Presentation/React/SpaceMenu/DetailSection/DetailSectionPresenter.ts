import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import IDetailSectionPresenter from "./IDetailSectionPresenter";
import DetailSectionViewModel from "./DetailSectionViewModel";
import { logger } from "src/Lib/Logger";
import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";
import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";

export default class DetailSectionPresenter implements IDetailSectionPresenter {
  constructor(private viewModel: DetailSectionViewModel) {}

  onWorldLoaded(world: WorldTO): void {
    let spaces: [number, string][] = [];

    world.spaces.forEach((space) => {
      spaces.push([space.id, space.name]);
    });

    // set all values at once to avoid multiple re-renders
    this.viewModel.spaces.Value = spaces;
  }

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: ElementID
  ): void {
    this.viewModel.spaceCompleted.Value.push([spaceID, score >= requiredScore]);
  }

  onSpaceDataLoaded(spaceTO: SpaceTO): void {
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

    this.viewModel.requiredPoints.Value = spaceTO.requiredPoints;

    this.viewModel.requirements.Value = spaceTO.requirements;
  }
}
