import {
  AbstractMesh,
  ICrowd,
  ISceneLoaderProgressEvent,
  Mesh,
  Nullable,
  RecastJSPlugin,
  Scene,
} from "@babylonjs/core";
import ICreateSceneClass from "./ICreateSceneClass";

export default interface IScenePresenter {
  get Scene(): Scene;
  get Navigation(): RecastJSPlugin;
  get NavigationCrowd(): ICrowd;

  createScene(createSceneClass: ICreateSceneClass): Promise<void>;
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

  createNavMesh(): void;
}
