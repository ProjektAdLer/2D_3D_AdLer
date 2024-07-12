import UserLearningWorldsInfoTO from "src/Components/Core/Application/DataTransferObjects/UserLearningWorldsInfoTO";
import IReturnHomeModalPresenter from "./IReturnHomeModalPresenter";
import ReturnHomeModalViewModel from "./ReturnHomeModalViewModel";

export default class ReturnHomeModalPresenter
  implements IReturnHomeModalPresenter
{
  constructor(private viewModel: ReturnHomeModalViewModel) {}

  onUserInitialLearningWorldsInfoLoaded(
    userLearningWorldsInfoTO: UserLearningWorldsInfoTO
  ): void {
    this.viewModel.isNoWorldAvailable.Value =
      userLearningWorldsInfoTO.worldInfo.length === 0;
  }
}
