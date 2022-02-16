import ICore from "./ICore";
import ICoreFactory from "./ICoreFactory";
import CoreDIContainer from "../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../DependencyInjection/types";

// This Factory is needed, because React does not allow us to use the DI container.

export default class CoreFactory implements ICoreFactory {
  createCore = (): ICore => {
    return CoreDIContainer.get<ICore>(CORE_TYPES.ICore);
  };
}
