import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";
import IWorldCompletionModalPresenter from "./IWorldCompletionModalPresenter";
import WorldCompletionModalViewModel from "./WorldCompletionModalViewModel";

export default class WorldCompletionModalPresenter
  implements IWorldCompletionModalPresenter
{
  constructor(private viewModel: WorldCompletionModalViewModel) {}

  onWorldLoaded(world: WorldTO): void {
    this.viewModel.spaceIDs.Value = world.spaces.map((space) => space.id);
  }

  onSpaceLoaded(spaceTO: SpaceTO): void {}

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: number
  ): void {
    this.viewModel.spacesCompleted.Value.push([
      spaceID,
      score >= requiredScore,
    ]);

    // check if all spaces have been completed
    let allSpacesCompleted = this.viewModel.spaceIDs.Value.reduce<boolean>(
      (accumulator, spaceID) => {
        let completed = this.viewModel.spacesCompleted.Value.find(
          (spaceCompleted) => spaceCompleted[0] === spaceID
        )?.[1];

        // if the space isn't found, it hasn't been completed
        if (completed === undefined) {
          // Booleans cant be undefined
          /* istanbul ignore next */
          completed = false;
        }

        return accumulator && completed;
      },
      true
    );

    if (allSpacesCompleted) {
      this.viewModel.showModal.Value = true;
    }
  }
}
