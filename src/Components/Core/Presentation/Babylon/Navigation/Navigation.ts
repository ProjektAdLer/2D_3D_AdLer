import {
  RecastJSPlugin,
  ICrowd,
  Mesh,
  StandardMaterial,
  Vector3,
  Color3,
} from "@babylonjs/core";
import SimpleEvent from "../../../../../Lib/SimpleEvent";
import INavigation from "./INavigation";
import * as Recast from "recast-detour";
import { inject, injectable } from "inversify";
import type IScenePresenter from "../SceneManagement/IScenePresenter";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import NavigationConfiguration from "./NavigationConfiguration";

@injectable()
export default class Navigation implements INavigation {
  private plugin: RecastJSPlugin;
  private crowd: ICrowd;
  private navMeshDebug: Mesh;
  private matDebug: StandardMaterial;

  public onNavigationReadyObservable: SimpleEvent = new SimpleEvent();

  constructor(
    @inject(CORE_TYPES.IScenePresenter) private scenePresenter: IScenePresenter,
    @inject(NavigationConfiguration)
    private navigationConfiguration: NavigationConfiguration
  ) {}

  get Plugin(): RecastJSPlugin {
    return this.plugin;
  }
  get Crowd(): ICrowd {
    return this.crowd;
  }

  async setupNavigation(): Promise<void> {
    if (this.plugin) {
      console.warn(
        "Repeated call to setupNavigation. This can break the agents indices."
      );
    }

    // -- Navigation Plugin --
    this.plugin = new RecastJSPlugin(await new Recast());

    // -- NavMesh --
    this.plugin.createNavMesh(
      this.scenePresenter.NavigationMeshes,
      this.navigationConfiguration.navmeshParameters
    );

    // debug: colored navmesh representation
    this.navMeshDebug?.dispose();
    this.navMeshDebug = this.plugin.createDebugNavMesh(
      this.scenePresenter.Scene
    );
    this.navMeshDebug.position = new Vector3(0, 0.01, 0);
    this.matDebug = new StandardMaterial("matdebug", this.scenePresenter.Scene);
    this.matDebug.diffuseColor = new Color3(0.1, 0.2, 1);
    this.matDebug.alpha = 0.2;
    this.navMeshDebug.material = this.matDebug;

    // -- Navigation Crowd --
    this.crowd = this.plugin.createCrowd(
      this.navigationConfiguration.maxAgentCount,
      this.navigationConfiguration.maxAgentRadius,
      this.scenePresenter.Scene
    );

    this.onNavigationReadyObservable.notifySubscribers();
  }
}
