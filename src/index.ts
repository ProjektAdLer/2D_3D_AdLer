import "reflect-metadata";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import IReactEntry from "./Components/Core/Presentation/React/ReactEntryPoint/IReactEntry";

window.scrollTo(0, 1);

const reactEntry = CoreDIContainer.get<IReactEntry>(CORE_TYPES.ICoreRenderer);

reactEntry.setupReact();
