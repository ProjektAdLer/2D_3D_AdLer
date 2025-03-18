import ISetNarrativeFrameworkToShownUseCase from "src/Components/Core/Application/UseCases/SetNarrativeFrameworkToShown/ISetNarrativeFrameworkToShownUseCase";
import INarrativeFrameworkController from "./INarrativeFrameworkController";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class NarrativeFrameworkController
  implements INarrativeFrameworkController
{
  private setNarrativeFrameworkToShownUseCase: ISetNarrativeFrameworkToShownUseCase;
  constructor(private viewModel: NarrativeFrameworkViewModel) {
    this.setNarrativeFrameworkToShownUseCase = CoreDIContainer.get(
      USECASE_TYPES.ISetNarrativeFrameworkToShownUseCase,
    );
  }
  closeNarrativeFramework() {
    this.viewModel.isOpen.Value = false;
    this.setNarrativeFrameworkToShownUseCase.execute();
  }
}
