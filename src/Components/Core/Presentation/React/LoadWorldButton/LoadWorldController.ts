import ILoadWorldUseCase from "../../../Application/LoadWorld/ILoadWorldUseCase";
import ILoadAvatarUseCase from "../../../Application/LoadAvatar/ILoadAvatarUseCase";
import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import ILoadWorldController from "./ILoadWorldController";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_SYMBOLS";

@injectable()
export class LoadWorldController implements ILoadWorldController {
  async loadWorld(): Promise<void> {
    const useCase = CoreDIContainer.get<ILoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    );

    await useCase.executeAsync();
  }
  async loadAvatar(): Promise<void> {
    const useCase = CoreDIContainer.get<ILoadAvatarUseCase>(
      USECASE_TYPES.ILoadAvatarUseCase
    );
  }
}
