import UserInitialLearningWorldsInfoTO from "src/Components/Core/Application/DataTransferObjects/UserInitialLearningWorldsInfoTO";
import ILearningWorldSelectionPresenter from "./ILearningWorldSelectionPresenter";
import LearningWorldSelectionViewModel from "./LearningWorldSelectionViewModel";
import UserLearningWorldsInfoTO from "src/Components/Core/Application/DataTransferObjects/UserLearningWorldsInfoTO";

export default class LearningWorldSelectionPresenter
  implements ILearningWorldSelectionPresenter
{
  constructor(private viewModel: LearningWorldSelectionViewModel) {}

  onUserInitialLearningWorldsInfoLoaded(
    userWorlds: UserInitialLearningWorldsInfoTO
  ): void {
    this.viewModel.userWorlds.Value = [];
    userWorlds.worldInfo.forEach((world) => {
      this.viewModel.userWorlds.Value.push({
        id: world.worldID,
        name: world.worldName,
        isCompleted: false,
      });
    });
  }
  onUserLearningWorldsInfoLoaded(userWorlds: UserLearningWorldsInfoTO): void {
    this.viewModel.userWorlds.Value = [];
    userWorlds.worldInfo.forEach((world) => {
      this.viewModel.userWorlds.Value.push({
        id: world.worldID,
        name: world.worldName,
        isCompleted: world.isCompleted,
      });
    });
    this.viewModel.newData.Value = true;
  }
}
