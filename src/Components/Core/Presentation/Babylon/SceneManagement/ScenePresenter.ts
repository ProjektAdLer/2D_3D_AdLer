import {
  AbstractMesh,
  ISceneLoaderProgressEvent,
  Mesh,
  Nullable,
  Scene,
  SceneLoader,
  SceneOptions,
  Engine,
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
  private sceneDefinition: AbstractSceneDefinition;

  get Scene(): Scene {
    return this.sceneDefinition.Scene;
  }

  get NavigationMeshes(): Mesh[] {
    return this.navigationMeshes as Mesh[];
  }

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
    sceneDefinition: AbstractSceneDefinition,
    sceneOptions?: SceneOptions
  ): Promise<void> {
    this.sceneDefinition = sceneDefinition;
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
