import ILoadWorld from "../../Application/LoadWorld/ILoadWorld";
import { injectable } from "inversify";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import ILoadWorldController from "./ILoadWorldController";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";

@injectable()
export class LoadWorldController implements ILoadWorldController {
  loadWorld(): void {
    const useCase = CoreDIContainer.get<ILoadWorld>(CORE_TYPES.ILoadWorld);

    useCase.execute();
  }
}
