import "reflect-metadata";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import ICore from "./Components/Core/API/ICore";

const Core = CoreDIContainer.get<ICore>(CORE_TYPES.ICore);

Core.setupReact();
