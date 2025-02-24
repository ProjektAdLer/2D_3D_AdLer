import {
  AbstractMesh,
  ISceneLoaderProgressEvent,
  Mesh,
  Nullable,
  Scene,
  SceneLoader,
  SceneOptions,
  Engine,
  HighlightLayer,
  IInspectorOptions,
  ISceneLoaderAsyncResult,
} from "@babylonjs/core";
import { injectable } from "inversify";
import AbstractSceneDefinition from "./Scenes/AbstractSceneDefinition";
import IScenePresenter from "./IScenePresenter";
import bind from "bind-decorator";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import { Inspector } from "@babylonjs/inspector";

/**
 * @description This class is responsible for creating the Scene and managing the NavMesh navigation.
 */
@injectable()
export default class ScenePresenter implements IScenePresenter {
  private navigationMeshes: AbstractMesh[] = [];
  private disposeSceneCallbacks: (() => void)[] = [];

  private logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

  get Scene(): Scene {
    if (!this.sceneDefinition.Scene) {
      throw new Error("Scene is not initialized yet");
    }
    return this.sceneDefinition.Scene;
  }

  get HighlightLayer(): HighlightLayer {
    if (!this.sceneDefinition.HighlightLayer) {
      throw new Error("HighlightLayer is not initialized yet");
    }
    return this.sceneDefinition.HighlightLayer;
  }

  get NavigationMeshes(): Mesh[] {
    return this.navigationMeshes as Mesh[];
  }

  constructor(private sceneDefinition: AbstractSceneDefinition) {}

  async loadModel(
    url: string,
    isRelevantForNavigation: boolean = false,
    onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>,
  ): Promise<AbstractMesh[]> {
    const result = await SceneLoader.ImportMeshAsync(
      "",
      url,
      "",
      this.Scene,
      onProgress,
    );

    if (isRelevantForNavigation) {
      this.navigationMeshes.push(...result.meshes);
    }

    return Promise.resolve(result.meshes);
  }

  async loadGLTFModel(
    url: string,
    isRelevantForNavigation: boolean = false,
    onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>,
  ): Promise<ISceneLoaderAsyncResult> {
    const result = await SceneLoader.ImportMeshAsync(
      "",
      url,
      "",
      this.Scene,
      onProgress,
    );

    if (isRelevantForNavigation) {
      this.navigationMeshes.push(...result.meshes);
    }

    return Promise.resolve(result);
  }

  createMesh(name: string, isRelevantForNavigation: boolean = false): Mesh {
    let mesh = new Mesh(name, this.Scene);

    if (isRelevantForNavigation) {
      this.navigationMeshes.push(mesh);
    }

    return mesh;
  }

  registerNavigationMesh(mesh: Mesh): void {
    this.navigationMeshes.push(mesh);
  }

  async createScene(
    engine: Engine,
    sceneOptions?: SceneOptions,
  ): Promise<void> {
    await this.sceneDefinition.createScene(engine, sceneOptions);
  }

  disposeScene(): void {
    this.logger.log(LogLevelTypes.INFO, "Disposing scene");
    this.navigationMeshes = [];
    this.disposeSceneCallbacks.forEach((callback) => callback());
    this.disposeSceneCallbacks = [];
    this.sceneDefinition.disposeScene();
  }

  addDisposeSceneCallback(callback: () => void): void {
    this.disposeSceneCallbacks.push(callback);
  }

  startRenderLoop(): void {
    this.Scene.getEngine().runRenderLoop(this.renderFunction);
  }

  toggleInspector(options?: IInspectorOptions): void {
    if (Inspector.IsVisible) Inspector.Hide();
    else Inspector.Show(this.Scene, options ?? {});
  }

  @bind
  private renderFunction(): void {
    if (this.Scene.activeCamera) {
      this.Scene.render();
    } else {
      this.logger.log(LogLevelTypes.WARN, "no active camera..");
    }
  }
}
