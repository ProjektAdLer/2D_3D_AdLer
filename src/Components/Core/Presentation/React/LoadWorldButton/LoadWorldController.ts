import ILoadWorldUseCase from "../../../Application/LoadWorld/ILoadWorldUseCase";
import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import ILoadWorldController from "./ILoadWorldController";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IViewModelProvider from "../../ViewModelProvider/IViewModelProvider";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_SYMBOLS";

@injectable()
export class LoadWorldController implements ILoadWorldController {
  async loadWorld(): Promise<void> {
    const useCase = CoreDIContainer.get<ILoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    );

    await useCase.executeAsync();
  }
}
