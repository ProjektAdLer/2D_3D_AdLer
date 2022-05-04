import { inject } from "inversify";
import ILoadWorldUseCase from "../../Application/LoadWorld/ILoadWorldUseCase";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";

export default class LearningWorldController {
  constructor(
    @inject(CORE_TYPES.ILoadWorldUseCase)
    private loadWorldUseCase: ILoadWorldUseCase
  ) {}
  public loadWorldName = async () => {
    await this.loadWorldUseCase.executeAsync();
  };
}
