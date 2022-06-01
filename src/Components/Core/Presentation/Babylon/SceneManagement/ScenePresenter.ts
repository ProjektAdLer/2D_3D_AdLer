import {
  AbstractMesh,
  Color3,
  ICrowd,
  ISceneLoaderProgressEvent,
  Mesh,
  Nullable,
  RecastJSPlugin,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { inject, injectable } from "inversify";
import type IEngineManager from "../EngineManager/IEngineManager";
import ISceneView from "./ISceneView";
import SceneViewModel from "./SceneViewModel";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ICreateSceneClass from "./ICreateSceneClass";
import IScenePresenter from "./IScenePresenter";
import * as Recast from "recast-detour";

/**
 * @description This class is responsible for creating the Scene and managing the NavMesh navigation.
 */
@injectable()
export default class ScenePresenter implements IScenePresenter {
  constructor(
    @inject(CORE_TYPES.IEngineManager) private engineManager: IEngineManager,
    @inject(SceneViewModel) private viewModel: SceneViewModel,
    @inject(CORE_TYPES.ISceneView) private view: ISceneView
  ) {
    this.setupNavigation();
  }

  get NavigationCrowd(): ICrowd {
    if (!this.viewModel.navigationCrowd) {
      throw new Error("Crowd is not defined");
    }
    return this.viewModel.navigationCrowd;
  }

  get Navigation(): RecastJSPlugin {
    if (!this.viewModel.navigation) {
      throw new Error("Navigation is not defined");
    }
    return this.viewModel.navigation;
  }

  get Scene(): Scene {
    if (!this.viewModel.scene) {
      throw new Error("SceneViewModel is not defined");
    }
    return this.viewModel.scene;
  }

  /**
   * Loads a model from given url into the scene
   * @param url the url to the model
   * @param isRelevantForNavigation defines if the model is considered when creating the NavMesh (default: false)
   * @param onProgress  the callback function for progress events (optional)
   * @returns a promise with the loaded meshes
   */
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
      this.createNavMesh();
    }

    return result.meshes;
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
    this.view.startRenderLoop(this.engineManager.Engine);
  }

  private async setupNavigation(): Promise<void> {
    let recast = await new Recast();
    this.viewModel.navigation = new RecastJSPlugin(recast);

    // create first NavMesh so that it's not undefined
    this.createNavMesh();

    this.viewModel.navigationCrowd = this.viewModel.navigation.createCrowd(
      this.viewModel.maxAgentCount,
      this.viewModel.maxAgentRadius,
      this.viewModel.scene
    );
  }

  private createNavMesh(): void {
    this.viewModel.navigation.createNavMesh(
      // this.viewModel.navigationMeshes as Mesh[],
      this.viewModel.scene.meshes as Mesh[],
      this.viewModel.navmeshParameters
    );

    // debug: colored navmesh representation
    var navmeshdebug = this.viewModel.navigation.createDebugNavMesh(
      this.viewModel.scene
    );
    navmeshdebug.position = new Vector3(0, 0.01, 0);
    var matdebug = new StandardMaterial("matdebug", this.viewModel.scene);
    matdebug.diffuseColor = new Color3(0.1, 0.2, 1);
    matdebug.alpha = 0.2;
    navmeshdebug.material = matdebug;
  }
}
