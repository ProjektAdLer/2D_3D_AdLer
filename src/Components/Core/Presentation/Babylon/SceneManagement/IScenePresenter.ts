import {
  AbstractMesh,
  ISceneLoaderProgressEvent,
  Mesh,
  Nullable,
  Scene,
  Engine,
  SceneOptions,
  HighlightLayer,
  IInspectorOptions,
  ISceneLoaderAsyncResult,
  ShadowGenerator,
} from "@babylonjs/core";

export default interface IScenePresenter {
  get Scene(): Scene;

  get HighlightLayer(): HighlightLayer;

  /**
   * @returns all registered meshes in the scene that are marked to influence the navigation.
   */
  get NavigationMeshes(): Mesh[];

  get ShadowGenerator(): ShadowGenerator;

  /**
   * Creates a new scene with the given CreateSceneClass configuration.
   * @param createSceneClass The scene configuration class that will be used to create the scene.
   */
  createScene(engine: Engine, sceneOptions?: SceneOptions): Promise<void>;

  disposeScene(): void;

  addDisposeSceneCallback(callback: () => void): void;

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
    onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>,
  ): Promise<AbstractMesh[]>;

  /**
   * Loads a gltf model from given url into the scene
   * @param url the url to the model
   * @param isRelevantForNavigation defines if the model is considered when creating the NavMesh (default: false)
   * @param onProgress  the callback function for progress events (optional)
   * @returns a promise with all loaded elements contained in the model
   */
  loadGLTFModel(
    url: string,
    isRelevantForNavigation?: boolean,
    onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>,
  ): Promise<ISceneLoaderAsyncResult>;

  /**
   * Creates a new mesh in the scene
   * @param name the name for the newly created mesh
   * @param isRelevantForNavigation defines if the mesh is considered when creating the NavMesh (default: false)
   * @returns the newly created mesh
   */
  createMesh(name: string, isRelevantForNavigation?: boolean): Mesh;

  /**
   * Registers a mesh with the scene that need to be taken into consideration for navigation purposes
   * @param mesh the mesh to be registered
   */
  registerNavigationMesh(mesh: Mesh): void;

  /**
   * Toggles Babylonjs inspector visibility.
   */
  toggleInspector(options?: IInspectorOptions): void;
}
