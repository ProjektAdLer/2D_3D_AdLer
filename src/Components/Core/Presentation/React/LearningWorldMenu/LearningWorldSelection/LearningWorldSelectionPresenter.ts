import UserLearningWorldsTO from "src/Components/Core/Application/DataTransferObjects/UserLearningWorldsTO";
import ILearningWorldSelectionPresenter from "./ILearningWorldSelectionPresenter";
import LearningWorldSelectionViewModel from "./LearningWorldSelectionViewModel";

export default class LearningWorldSelectionPresenter
  implements ILearningWorldSelectionPresenter
{
  constructor(private viewModel: LearningWorldSelectionViewModel) {}

  onUserLearningWorldsLoaded(userWorlds: UserLearningWorldsTO): void {
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
