import {
  AbstractMesh,
  ISceneLoaderProgressEvent,
  Mesh,
  Nullable,
  Scene,
  SceneLoader,
} from "@babylonjs/core";
import { inject, injectable } from "inversify";
import type IEngineManager from "../EngineManager/IEngineManager";
import type ISceneView from "./ISceneView";
import SceneViewModel from "./SceneViewModel";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ICreateSceneClass from "./ICreateSceneClass";
import IScenePresenter from "./IScenePresenter";

/**
 * @description This class is responsible for creating the Scene and managing the NavMesh navigation.
 */
@injectable()
export default class ScenePresenter implements IScenePresenter {
  get Scene(): Scene {
    if (!this.viewModel.scene) {
      throw new Error("SceneViewModel is not defined");
    }
    return this.viewModel.scene;
  }

  get NavigationMeshes(): Mesh[] {
    return this.viewModel.navigationMeshes as Mesh[];
  }

  constructor(
    @inject(CORE_TYPES.IEngineManager) private engineManager: IEngineManager,
    @inject(SceneViewModel) private viewModel: SceneViewModel,
    @inject(CORE_TYPES.ISceneView) private view: ISceneView
  ) {}

  async loadModel(
    url: string,
    isRelevantForNavigation: boolean = false,
    onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>
  ): Promise<AbstractMesh[]> {
    const result = await SceneLoader.ImportMeshAsync(
      "",
      url,
      "",
      this.viewModel.scene,
      onProgress
    );

    if (isRelevantForNavigation) {
      this.viewModel.navigationMeshes.push(...result.meshes);
    }

    return Promise.resolve(result.meshes);
  }

  createMesh(name: string, isRelevantForNavigation: boolean = false): Mesh {
    let mesh = new Mesh(name, this.viewModel.scene);

    if (isRelevantForNavigation) {
      this.viewModel.navigationMeshes.push(mesh);
    }

    return mesh;
  }

  async createScene(createSceneClass: ICreateSceneClass): Promise<void> {
    // Execute the pretasks, if defined
    await Promise.all(createSceneClass.preTasks || []);

    // Create the scene
    this.viewModel.scene = await createSceneClass.createScene(
      this.engineManager.Engine,
      this.engineManager.Engine.getRenderingCanvas()!
    );
  }

  startRenderLoop(): void {
    this.view.startRenderLoop();
  }
}
