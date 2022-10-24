import { config } from "./config";
import "reflect-metadata";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import IReactEntry from "./Components/Core/Presentation/React/ReactRelated/ReactEntryPoint/IReactEntry";
import "./Components/Core/Types/array.extensions";

//@ts-ignore
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

console.log(config.serverURL);
console.log(window.location.host);
console.log(window.location.host);

const reactEntry = CoreDIContainer.get<IReactEntry>(CORE_TYPES.ICoreRenderer);

reactEntry.setupReact();
