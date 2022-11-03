import { ICrowd, RecastJSPlugin } from "@babylonjs/core";
import SimpleEvent from "../../../../../Lib/SimpleEvent";

export default interface INavigation {
  get Plugin(): RecastJSPlugin;
  get Crowd(): ICrowd;

  onNavigationReadyObservable: SimpleEvent;
  isReady: Promise<void>;

  /**
   * Creates the navmesh and navigation crowd, accessible via the NavigationPlugin and NavigationCrowd properties.
   * Should be initially called after all meshes have been loaded into the scene. Calling this method multiple times will break the agents registered to the crowd.
   */
  setupNavigation(): void;
}
