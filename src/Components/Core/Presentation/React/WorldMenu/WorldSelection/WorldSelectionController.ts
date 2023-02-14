import ILoadWorldUseCase from "src/Components/Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IWorldSelectionController from "./IWorldSelectionController";
import WorldSelectionViewModel from "./WorldSelectionViewModel";

export default class WorldSelectionController
  implements IWorldSelectionController
{
  private loadWorldUseCase: ILoadWorldUseCase;

  constructor(private viewModel: WorldSelectionViewModel) {}

  onWorldRowClicked(worldID: number): void {
    this.viewModel.selectedRowID.Value = worldID;
    //  this.loadWorldUseCase.executeAsync(worldID);
  }
}
