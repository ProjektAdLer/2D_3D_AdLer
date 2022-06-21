import "reflect-metadata";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import IReactEntry from "./Components/Core/Presentation/React/ReactEntryPoint/IReactEntry";
import "./Components/Core/Types/array.extensions";

const reactEntry = CoreDIContainer.get<IReactEntry>(CORE_TYPES.ICoreRenderer);

reactEntry.setupReact();

window.addEventListener(
  "message",
  (event) => {
    if (event.origin === "https://moodle.cluuub.xyz") console.log(event);
  },
  false
);
