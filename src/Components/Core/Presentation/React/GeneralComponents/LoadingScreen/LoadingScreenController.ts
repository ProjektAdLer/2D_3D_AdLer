import ILoadingScreenController from "./ILoadingScreenController";
import LoadingScreenViewModel from "./LoadingScreenViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IBeginStoryElementCutSceneUseCase from "src/Components/Core/Application/UseCases/BeginStoryElementCutScene/IBeginStoryElementCutSceneUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

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
      ).execute(StoryElementType.Intro);

      console.log("disable User-Inputs");
    }
  }
}
