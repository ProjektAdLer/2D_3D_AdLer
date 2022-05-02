import { inject } from "inversify";
import ILoadWorld from "../../Application/LoadWorld/ILoadWorld";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";

export default class LearningWorldController {
  constructor(
    @inject(CORE_TYPES.ILoadWorld) private loadWorldUseCase: ILoadWorld
  ) {}
  public loadWorldName = () => {
    this.loadWorldUseCase.execute();
  };
}
