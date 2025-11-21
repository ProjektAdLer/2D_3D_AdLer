import "reflect-metadata";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import IReactEntry from "./Components/Core/Presentation/React/ReactRelated/ReactEntryPoint/IReactEntry";
import { config } from "./config";
import { configureDracoForOfflineUse } from "./draco-configuration";
import H5PIndexedDBServer from "./Components/Core/Adapters/H5PIndexedDBServer/H5PIndexedDBServer";

console.log("Current Config:", config);

// Configure Draco for offline use before any 3D content is loaded
configureDracoForOfflineUse();

// Initialize H5P IndexedDB Server (Service Worker for serving H5P from IndexedDB)
H5PIndexedDBServer.getInstance()
  .init()
  .then(() => {
    console.log("[App] H5P IndexedDB Server initialized");
  })
  .catch((error) => {
    console.warn("[App] Failed to initialize H5P IndexedDB Server:", error);
  });

// Setup the Logger to be constructed.
CoreDIContainer.get(CORE_TYPES.ILogger);

// Setup the Backend Adapter to validate the Server URL and trigger
// the BackendAdapter to be constructed.
CoreDIContainer.get(CORE_TYPES.IBackendAdapter);

const reactEntry = CoreDIContainer.get<IReactEntry>(CORE_TYPES.ICoreRenderer);

reactEntry.setupReact();
