import "reflect-metadata";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import IReactEntry from "./Components/Core/Presentation/React/ReactRelated/ReactEntryPoint/IReactEntry";
import { config } from "./config";

console.log("Current Config:", config);

// Setup the Logger to be constructed.
CoreDIContainer.get(CORE_TYPES.ILogger);

// Setup the Backend Adapter to validate the Server URL and trigger
// the BackendAdapter to be constructed.
CoreDIContainer.get(CORE_TYPES.IBackendAdapter);

const reactEntry = CoreDIContainer.get<IReactEntry>(CORE_TYPES.ICoreRenderer);

reactEntry.setupReact();
