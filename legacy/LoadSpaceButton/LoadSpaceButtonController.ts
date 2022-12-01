import ILoadWorldUseCase from "../../src/Components/Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "../../src/Components/Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../src/Components/Core/DependencyInjection/UseCases/USECASE_TYPES";
import ILoadSpaceButtonController from "./ILoadSpaceButtonController";

export default class LoadSpaceButtonController
  implements ILoadSpaceButtonController
{
  async loadWorld(): Promise<void> {
    const useCase = CoreDIContainer.get<ILoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    );

    await useCase.executeAsync();
  }
}
