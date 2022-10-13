import ILoadSpaceUseCase from "src/Components/Core/Application/UseCases/LoadSpace/ILoadSpaceUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ISpaceSelectionController from "./ISpaceSelectionController";
import SpaceSelectionViewModel from "./SpaceSelectionViewModel";

export default class SpaceSelectionController
  implements ISpaceSelectionController
{
  private loadSpaceUseCase: ILoadSpaceUseCase;

  constructor(private viewModel: SpaceSelectionViewModel) {
    this.loadSpaceUseCase = CoreDIContainer.get(
      USECASE_TYPES.ILoadSpaceUseCase
    );
  }

  onSpaceRowClicked(spaceId: number): void {
    this.viewModel.selectedRowID.Value = spaceId;
    this.loadSpaceUseCase.executeAsync(spaceId);
  }
}
