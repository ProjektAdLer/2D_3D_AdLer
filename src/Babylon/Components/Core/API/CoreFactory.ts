import ICore from "./ICore";
import Core from "./Core";
import ICoreFactory from "./ICoreFactory";
import CoreDIContainer from "../DependencyInjection/CoreDIContainer";

// This Factory is needed, because React does not allow us to use the DI container.

export default class CoreFactory implements ICoreFactory {
  CreateCore = (): ICore => {
    return CoreDIContainer.get<Core>(Core);
  };
}
