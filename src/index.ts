import "reflect-metadata";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import IReactEntry from "./Components/Core/Presentation/React/ReactRelated/ReactEntryPoint/IReactEntry";
import { logger } from "./Lib/Logger";
import { config } from "./config";

logger.log("API_URL: " + config.serverURL);

const reactEntry = CoreDIContainer.get<IReactEntry>(CORE_TYPES.ICoreRenderer);

reactEntry.setupReact();
