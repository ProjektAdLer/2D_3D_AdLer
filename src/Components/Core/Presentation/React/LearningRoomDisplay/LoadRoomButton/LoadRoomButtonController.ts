import ILoadWorldUseCase from "../../../../Application/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import ILoadRoomButtonController from "./ILoadRoomButtonController";

export default class LoadRoomButtonController
  implements ILoadRoomButtonController
{
  async loadWorld(): Promise<void> {
    const useCase = CoreDIContainer.get<ILoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    );

    await useCase.executeAsync();
  }
}
