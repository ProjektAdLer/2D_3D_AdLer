import ILoadLearningWorldUseCase from "src/Components/Core/Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ILearningWorldSelectionController from "./ILearningWorldSelectionController";
import LearningWorldSelectionViewModel from "./LearningWorldSelectionViewModel";

export default class LearningWorldSelectionController
  implements ILearningWorldSelectionController
{
  private loadWorldUseCase: ILoadLearningWorldUseCase;

  constructor(private viewModel: LearningWorldSelectionViewModel) {
    this.loadWorldUseCase = CoreDIContainer.get<ILoadLearningWorldUseCase>(
      USECASE_TYPES.ILoadLearningWorldUseCase
    );
  }

  onLearningWorldRowClicked(worldID: number): void {
    this.viewModel.selectedRowID.Value = worldID;
    this.loadWorldUseCase.executeAsync({ worldID });
  }
}