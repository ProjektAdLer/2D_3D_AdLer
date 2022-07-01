import "reflect-metadata";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import IReactEntry from "./Components/Core/Presentation/React/ReactEntryPoint/IReactEntry";
import "./Components/Core/Types/array.extensions";
import { logger } from "./Lib/Logger";

const reactEntry = CoreDIContainer.get<IReactEntry>(CORE_TYPES.ICoreRenderer);

reactEntry.setupReact();

// Excample for the new logger
// logger.warn("This is a warning");
// logger.error("This is an error");
// logger.log("This is a log");
