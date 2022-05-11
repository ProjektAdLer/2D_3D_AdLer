import { inject } from "inversify";
import ILoadWorldUseCase from "../../../Application/LoadWorld/ILoadWorldUseCase";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_SYMBOLS";

export default class LearningWorldController {
  constructor(
    @inject(USECASE_TYPES.ILoadWorldUseCase)
    private loadWorldUseCase: ILoadWorldUseCase
  ) {}
  public loadWorldName = async () => {
    await this.loadWorldUseCase.executeAsync();
  };
}
