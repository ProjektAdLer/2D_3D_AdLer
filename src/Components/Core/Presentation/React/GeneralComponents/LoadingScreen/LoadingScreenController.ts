import ILoadingScreenController from "./ILoadingScreenController";
import LoadingScreenViewModel from "./LoadingScreenViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IBeginStoryElementIntroCutSceneUseCase from "src/Components/Core/Application/UseCases/BeginStoryElementIntroCutScene/IBeginStoryElementIntroCutSceneUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import INarrativeFrameworkIntroPresenter from "../NarrativeFrameworkIntro/INarrativeFrameworkIntroPresenter";

export default class LoadingScreenController
  implements ILoadingScreenController
{
  constructor(private viewModel: LoadingScreenViewModel) {}
  closeLoadingScreen() {
    this.viewModel.isOpen.Value = false;

    if (this.viewModel.loadingLocation.Value.includes("spacedisplay")) {
      CoreDIContainer.get<IBeginStoryElementIntroCutSceneUseCase>(
        USECASE_TYPES.IBeginStoryElementIntroCutSceneUseCase,
      ).execute();
    }
  }
}
