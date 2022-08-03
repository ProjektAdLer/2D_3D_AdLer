import ILoadWorldUseCase from "../../../Application/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import ILoadLearningWorldButtonController from "./ILoadLearningWorldButtonController";

export default class LoadLearningWorldButtonController
  implements ILoadLearningWorldButtonController
{
  async loadWorld(): Promise<void> {
    const useCase = CoreDIContainer.get<ILoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    );

    await useCase.executeAsync();
  }
}
