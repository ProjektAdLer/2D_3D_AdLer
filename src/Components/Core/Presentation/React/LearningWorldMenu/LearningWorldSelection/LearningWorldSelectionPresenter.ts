import UserInitialLearningWorldsInfoTO from "src/Components/Core/Application/DataTransferObjects/UserInitialLearningWorldsInfoTO";
import ILearningWorldSelectionPresenter from "./ILearningWorldSelectionPresenter";
import LearningWorldSelectionViewModel from "./LearningWorldSelectionViewModel";
import UserLearningWorldsInfoTO from "src/Components/Core/Application/DataTransferObjects/UserLearningWorldsInfoTO";
import ILoadLearningWorldUseCase from "src/Components/Core/Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class LearningWorldSelectionPresenter
  implements ILearningWorldSelectionPresenter
{
  private loadWorldUseCase: ILoadLearningWorldUseCase;
  constructor(private viewModel: LearningWorldSelectionViewModel) {
    this.loadWorldUseCase = CoreDIContainer.get<ILoadLearningWorldUseCase>(
      USECASE_TYPES.ILoadLearningWorldUseCase,
    );
  }

  onUserInitialLearningWorldsInfoLoaded(
    userWorlds: UserInitialLearningWorldsInfoTO,
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
    const newWorlds = userWorlds.worldInfo.map((world) => ({
      id: world.worldID,
      name: world.worldName,
      isCompleted: world.isCompleted,
    }));
    this.viewModel.userWorlds.Value = newWorlds;
    this.viewModel.newData.Value = true;

    if (userWorlds.worldInfo.length !== 0) {
      // set the initially selected space
      this.viewModel.selectedWorldID.Value =
        userWorlds.lastVisitedWorldID || userWorlds.worldInfo[0].worldID;
      this.loadWorldUseCase.executeAsync({
        worldID:
          userWorlds.lastVisitedWorldID || userWorlds.worldInfo[0].worldID,
      });
    }
  }
}
