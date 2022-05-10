import ILoadWorldUseCase from "../../Application/LoadWorld/ILoadWorldUseCase";
import { injectable } from "inversify";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import ILoadWorldController from "./ILoadWorldController";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningWorldViewModel from "../LearningWorld/LearningWorldViewModel";
import IViewModelProvider from "../ViewModelProvider/IViewModelProvider";
import USECASE_TYPES from "../../DependencyInjection/UseCases/USECASE_SYMBOLS";

@injectable()
export class LoadWorldController implements ILoadWorldController {
  async loadWorld(): Promise<void> {
    const useCase = CoreDIContainer.get<ILoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    );

    const provider = CoreDIContainer.get<IViewModelProvider>(
      CORE_TYPES.IViewModelProvider
    );

    let viewModel: LearningWorldViewModel;

    // This is ugly AF, but it is the only way to access the VM thorugh the VMProvider. Marius please fix :)
    provider.registerRequest((value) => {
      viewModel = value[0];
    }, LearningWorldViewModel);

    //@ts-ignore
    // viewModel.worldNameLoading.setValue(true);

    await useCase.executeAsync();
  }
}
