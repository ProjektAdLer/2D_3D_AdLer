import {
  AbstractMesh,
  Color3,
  ICrowd,
  ISceneLoaderProgressEvent,
  Mesh,
  Nullable,
  Observable,
  RecastJSPlugin,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { inject, injectable } from "inversify";
import type IEngineManager from "../EngineManager/IEngineManager";
import type ISceneView from "./ISceneView";
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
  private navMeshDebug: Mesh;
  private matDebug: StandardMaterial;

  public onNavigationReadyObservable: Observable<void> = new Observable<void>();

  constructor(
    @inject(CORE_TYPES.IEngineManager) private engineManager: IEngineManager,
    @inject(SceneViewModel) private viewModel: SceneViewModel,
    @inject(CORE_TYPES.ISceneView) private view: ISceneView
  ) {}

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

    return result.meshes;
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

  async setupNavigation(): Promise<void> {
    if (this.viewModel.navigation) {
      console.warn("Repeated call to setupNavigation");
    }

    // -- Navigation Plugin --
    this.viewModel.navigation = new RecastJSPlugin(await new Recast());

    // -- NavMesh --
    this.viewModel.navigation.createNavMesh(
      this.viewModel.navigationMeshes as Mesh[],
      // this.viewModel.scene.meshes as Mesh[],
      this.viewModel.navmeshParameters
    );

    // debug: colored navmesh representation
    this.navMeshDebug?.dispose();
    this.navMeshDebug = this.viewModel.navigation.createDebugNavMesh(
      this.viewModel.scene
    );
    this.navMeshDebug.position = new Vector3(0, 0.01, 0);
    this.matDebug = new StandardMaterial("matdebug", this.viewModel.scene);
    this.matDebug.diffuseColor = new Color3(0.1, 0.2, 1);
    this.matDebug.alpha = 0.2;
    this.navMeshDebug.material = this.matDebug;

    // -- Navigation Crowd --
    this.viewModel.navigationCrowd = this.viewModel.navigation.createCrowd(
      this.viewModel.maxAgentCount,
      this.viewModel.maxAgentRadius,
      this.viewModel.scene
    );

    this.onNavigationReadyObservable.notifyObservers();
  }
}
