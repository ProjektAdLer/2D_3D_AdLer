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
} from "@babylonjs/core";
import { injectable } from "inversify";
import AbstractSceneDefinition from "./Scenes/AbstractSceneDefinition";
import IScenePresenter from "./IScenePresenter";
import { logger } from "src/Lib/Logger";
import bind from "bind-decorator";

/**
 * @description This class is responsible for creating the Scene and managing the NavMesh navigation.
 */
@injectable()
export default class ScenePresenter implements IScenePresenter {
  private navigationMeshes: AbstractMesh[] = [];

  get Scene(): Scene {
    if (!this.sceneDefinition.Scene) {
      throw new Error("Scene is not initialized yet");
    }
    return this.sceneDefinition.Scene;
  }

  get HighlightLayer(): HighlightLayer {
    return this.sceneDefinition.HighlightLayer;
  }

  get NavigationMeshes(): Mesh[] {
    return this.navigationMeshes as Mesh[];
  }

  constructor(private sceneDefinition: AbstractSceneDefinition) {}

  async loadModel(
    url: string,
    isRelevantForNavigation: boolean = false,
    onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>
  ): Promise<AbstractMesh[]> {
    const result = await SceneLoader.ImportMeshAsync(
      "",
      url,
      "",
      this.Scene,
      onProgress
    );

    if (isRelevantForNavigation) {
      this.navigationMeshes.push(...result.meshes);
    }

    return Promise.resolve(result.meshes);
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
    sceneOptions?: SceneOptions
  ): Promise<void> {
    await this.sceneDefinition.createScene(engine, sceneOptions);
  }

  startRenderLoop(): void {
    this.Scene.getEngine().runRenderLoop(this.renderFunction);
  }

  @bind
  private renderFunction(): void {
    if (this.Scene.activeCamera) {
      this.Scene.render();
    } else {
      logger.warn("no active camera..");
    }
  }
}
