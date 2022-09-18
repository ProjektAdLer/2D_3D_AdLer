import ILoadWorldUseCase from "../../../../Application/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
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
