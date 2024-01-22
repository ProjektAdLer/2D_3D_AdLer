import ILoadingScreenController from "./ILoadingScreenController";
import LoadingScreenViewModel from "./LoadingScreenViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IBeginStoryElementCutSceneUseCase from "src/Components/Core/Application/UseCases/BeginStoryElementCutScene/IBeginStoryElementCutSceneUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import EndStoryElementCutScene from "src/Components/Core/Application/UseCases/EndStoryElementCutScene/EndStoryElementCutScene";

export default class LoadingScreenController
  implements ILoadingScreenController
{
  constructor(private viewModel: LoadingScreenViewModel) {}
  closeLoadingScreen() {
    this.viewModel.isOpen.Value = false;

    console.log(this.viewModel.loadingLocation);

    if (this.viewModel.loadingLocation.Value.includes("spacedisplay")) {
      CoreDIContainer.get<IBeginStoryElementCutSceneUseCase>(
        USECASE_TYPES.IBeginStoryElementCutSceneUseCase
      ).execute();
      // fire event, that disables user input for controlling avatar

      console.log("disable User-Inputs");

      setTimeout(() => {
        CoreDIContainer.get<EndStoryElementCutScene>(
          USECASE_TYPES.IEndStoryElementCutScene
        ).execute();
        console.log("enable User-Inputs");
      }, 10000);
    }
  }
}
