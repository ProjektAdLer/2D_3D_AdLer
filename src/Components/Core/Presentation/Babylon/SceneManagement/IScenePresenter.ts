import {
  AbstractMesh,
  ICrowd,
  ISceneLoaderProgressEvent,
  Mesh,
  Nullable,
  Observable,
  RecastJSPlugin,
  Scene,
} from "@babylonjs/core";
import ICreateSceneClass from "./ICreateSceneClass";

export default interface IScenePresenter {
  get Scene(): Scene;
  get Navigation(): RecastJSPlugin;
  get NavigationCrowd(): ICrowd;

  onNavigationReadyObservable: Observable<void>;

  createScene(createSceneClass: ICreateSceneClass): Promise<void>;

  /**
   * Starts the render loop.
   */
  startRenderLoop(): void;

  /**
   * Loads a model from given url into the scene
   * @param url the url to the model
   * @param isRelevantForNavigation defines if the model is considered when creating the NavMesh (default: false)
   * @param onProgress  the callback function for progress events (optional)
   * @returns a promise with the loaded meshes
   */
  loadModel(
    url: string,
    isRelevantForNavigation?: boolean,
    onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>
  ): Promise<AbstractMesh[]>;

  /**
   * Creates a new mesh in the scene
   * @param name the name for the newly created mesh
   * @param isRelevantForNavigation defines if the mesh is considered when creating the NavMesh (default: false)
   * @returns the newly created mesh
   */
  createMesh(name: string, isRelevantForNavigation?: boolean): Mesh;

  /**
   * Creates the navmesh and navigation crowd, accessible via the Navigation and NavigationCrowd properties.
   * Should be called after all meshes have been loaded into the scene. Calling this method multiple times will break the agents registered to the crowd.
   */
  setupNavigation(): void;
}
