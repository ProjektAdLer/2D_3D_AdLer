import { ICrowd, RecastJSPlugin } from "@babylonjs/core";
import { IReadyable } from "../../../../../Lib/Readyable";

export default interface INavigation extends IReadyable {
  get Plugin(): RecastJSPlugin;
  get Crowd(): ICrowd;

  /**
   * Creates the navmesh and navigation crowd, accessible via the NavigationPlugin and NavigationCrowd properties.
   * Should be initially called after all meshes have been loaded into the scene. Calling this method multiple times will break the agents registered to the crowd.
   */
  setupNavigation(): Promise<void>;
  reset(): void;
}
