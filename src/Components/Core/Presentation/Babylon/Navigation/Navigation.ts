import {
  RecastJSPlugin,
  Mesh,
  StandardMaterial,
  Vector3,
  Color3,
  RecastJSCrowd,
} from "@babylonjs/core";
import INavigation from "./INavigation";
import * as Recast from "recast-detour";
import { inject, injectable } from "inversify";
import type IScenePresenter from "../SceneManagement/IScenePresenter";
import NavigationConfiguration from "./NavigationConfiguration";
import { config } from "../../../../../config";
import SCENE_TYPES from "~DependencyInjection/Scenes/SCENE_TYPES";
import type { ScenePresenterFactory } from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import Readyable from "../../../../../Lib/Readyable";
import { Semaphore } from "src/Lib/Semaphore";

@injectable()
export default class Navigation extends Readyable implements INavigation {
  private plugin: RecastJSPlugin;
  private crowd: RecastJSCrowd;
  private navMeshDebug: Mesh;
  private matDebug: StandardMaterial;
  private scenePresenter: IScenePresenter;

  private semaphore = new Semaphore("Navigation Setup running", 1);

  constructor(
    @inject(SCENE_TYPES.ScenePresenterFactory)
    private scenePresenterFactory: ScenePresenterFactory,
    @inject(NavigationConfiguration)
    private navigationConfiguration: NavigationConfiguration,
  ) {
    super();
  }

  get Plugin(): RecastJSPlugin {
    return this.plugin;
  }
  get Crowd(): RecastJSCrowd {
    return this.crowd;
  }

  async setupNavigation(): Promise<void> {
    const lock = await this.semaphore.acquire();

    if (this.plugin) {
      console.warn(
        "Repeated call to setupNavigation. " +
          " This may break the agents indices if it happens while a scene is running.",
      );
    }

    // create scenePresenter via factory (delayed creation to ensure that the scene is created)
    this.scenePresenter = this.scenePresenterFactory(
      LearningSpaceSceneDefinition,
    );

    // -- Navigation Plugin --
    // call to Recast.default for compatibility in production and tests
    this.plugin = new RecastJSPlugin(await Recast.default());

    // -- NavMesh --
    this.plugin.createNavMesh(
      this.scenePresenter.NavigationMeshes,
      this.navigationConfiguration.navmeshParameters,
    );
    this.plugin.setDefaultQueryExtent(new Vector3(2, 1, 2)); // supports querys on objects slightly outside navmesh

    // debug: colored navmesh representation
    if (config.isDebug === true) {
      this.navMeshDebug?.dispose();
      this.navMeshDebug = this.plugin.createDebugNavMesh(
        this.scenePresenter.Scene,
      );
      this.navMeshDebug.position = new Vector3(0, 0.01, 0);
      this.matDebug?.dispose();
      this.matDebug = new StandardMaterial(
        "matdebug",
        this.scenePresenter.Scene,
      );
      this.matDebug.diffuseColor = new Color3(0.1, 0.2, 1);
      this.matDebug.alpha = 0.2;
      this.navMeshDebug.material = this.matDebug;
    }

    // -- Navigation Crowd --
    this.crowd = this.plugin.createCrowd(
      this.navigationConfiguration.maxAgentCount,
      this.navigationConfiguration.maxAgentRadius,
      this.scenePresenter.Scene,
    ) as RecastJSCrowd;

    this.resolveIsReady();
    lock.release();
  }

  reset(): void {
    this.resetIsReady();
    this.crowd?.dispose();
    this.matDebug?.dispose();
    this.navMeshDebug?.dispose();
    this.plugin?.dispose();
  }
}
