import ICore from "./ICore";
import Core from "./Core";
import ICoreFactory from "./ICoreFactory";
import CoreDIContainer from "../DependencyInjection/CoreDIContainer";

export default class CoreFactory implements ICoreFactory {
  CreateCore = (): ICore => {
    return CoreDIContainer.get<Core>(Core);
  };
}
