import ILoadWorldUseCase from "../../../Application/LoadWorld/ILoadWorldUseCase";
import ILoadCharacterUseCase from "../../../Application/LoadCharacter/ILoadCharacterUseCase";
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
  async loadCharacter(): Promise<void> {
    const useCase = CoreDIContainer.get<ILoadCharacterUseCase>(
      USECASE_TYPES.ILoadCharacterUseCase
    );
  }
}
