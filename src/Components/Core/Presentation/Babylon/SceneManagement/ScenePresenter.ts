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
import ICreateSceneClass from "./ICreateSceneClass";
import IScenePresenter from "./IScenePresenter";
import { logger } from "src/Lib/Logger";
import bind from "bind-decorator";

/**
 * @description This class is responsible for creating the Scene and managing the NavMesh navigation.
 */
@injectable()
export default class ScenePresenter implements IScenePresenter {
  private scene: Scene;
  private navigationMeshes: AbstractMesh[] = [];

  get Scene(): Scene {
    if (!this.scene) {
      throw new Error(
        "There is no scene set. Create the scene first before requesting it."
      );
    }
    return this.scene;
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
      this.scene,
      onProgress
    );

    if (isRelevantForNavigation) {
      this.navigationMeshes.push(...result.meshes);
    }

    return Promise.resolve(result.meshes);
  }

  createMesh(name: string, isRelevantForNavigation: boolean = false): Mesh {
    let mesh = new Mesh(name, this.scene);

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
    createSceneClass: ICreateSceneClass,
    sceneOptions?: SceneOptions
  ): Promise<void> {
    // Execute the pretasks, if defined
    createSceneClass.preTasks?.forEach(async (task) => await task());

    // Create the scene
    this.scene = await createSceneClass.createScene(engine, sceneOptions);
  }

  startRenderLoop(): void {
    this.scene.getEngine().runRenderLoop(this.renderFunction);
  }

  @bind
  private renderFunction(): void {
    if (this.scene.activeCamera) {
      this.scene.render();
    } else {
      logger.warn("no active camera..");
    }
  }
}
