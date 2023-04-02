import ILoadLearningSpaceUseCase from "src/Components/Core/Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ILearningSpaceSelectionController from "./ILearningSpaceSelectionController";
import LearningSpaceSelectionViewModel from "./LearningSpaceSelectionViewModel";

export default class LearningSpaceSelectionController
  implements ILearningSpaceSelectionController
{
  private loadLearningSpaceUseCase: ILoadLearningSpaceUseCase;

  constructor(private viewModel: LearningSpaceSelectionViewModel) {
    this.loadLearningSpaceUseCase = CoreDIContainer.get(
      USECASE_TYPES.ILoadLearningSpaceUseCase
    );
  }

  onLearningSpaceClicked(spaceID: number): void {
    this.viewModel.selectedRowSpaceID.Value = spaceID;
    this.loadLearningSpaceUseCase.executeAsync({
      spaceID: spaceID,
      worldID: this.viewModel.worldID.Value,
    });
  }
}
