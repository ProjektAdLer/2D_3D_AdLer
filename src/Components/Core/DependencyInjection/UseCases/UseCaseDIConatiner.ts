import { ContainerModule } from "inversify";
import ILoadWorldUseCase from "../../Application/LoadWorld/ILoadWorldUseCase";
import LoadWorldUseCase from "../../Application/LoadWorld/LoadWorldUseCase";
import CORE_TYPES from "../CoreTypes";
import USECASE_TYPES from "./USECASE_SYMBOLS";
const useCaseDIContainer = new ContainerModule((bind) => {
  // Use Cases
  // Use Cases always have to be Singleton
  bind<ILoadWorldUseCase>(USECASE_TYPES.ILoadWorldUseCase)
    .to(LoadWorldUseCase)
    .inSingletonScope();
});

export default useCaseDIContainer;
