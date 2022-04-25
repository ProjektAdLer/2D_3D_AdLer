import { ILoadWorld } from "../../Domain/LoadWorld/ILoadWorld";
import { injectable } from "inversify";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import { ILoadWorldPresenter } from "./ILoadWorldController";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";

@injectable()
export class LoadWorldPresenter implements ILoadWorldPresenter {
  loadWorld(): void {
    const useCase = CoreDIContainer.get<ILoadWorld>(CORE_TYPES.ILoadWorld);

    useCase.execute();
  }
}
