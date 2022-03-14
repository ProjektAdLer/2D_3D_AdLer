import { inject, injectable } from "inversify";
import IEngineManager from "../EngineManager/IEngineManager";
import ISceneView from "./ISceneView";
import SceneViewModel from "./SceneViewModel";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import { Scene } from "@babylonjs/core";

import ICreateSceneClass from "./ICreateSceneClass";
import IScenePresenter from "./IScenePresenter";

@injectable()
export default class ScenePresenter implements IScenePresenter {
  private engineManager: IEngineManager;
  private sceneView: ISceneView;
  private sceneViewModel: SceneViewModel;

  constructor(
    @inject(CORE_TYPES.IEngineManager) engineManager: IEngineManager,
    @inject(SceneViewModel) sceneViewModel: SceneViewModel,
    @inject(CORE_TYPES.ISceneView) sceneView: ISceneView
  ) {
    this.engineManager = engineManager;
    this.sceneView = sceneView;
    this.sceneViewModel = sceneViewModel;
  }

  async createScene(createSceneClass: ICreateSceneClass): Promise<void> {
    // Execute the pretasks, if defined
    await Promise.all(createSceneClass.preTasks || []);

    // Create the scene
    this.sceneViewModel.Scene = await createSceneClass.createScene(
      this.engineManager.Engine,
      this.engineManager.Engine.getRenderingCanvas()!
    );
  }

  createRenderLoop(): void {
    this.sceneView.createRenderLoop(this.engineManager.Engine);
  }

  get Scene(): Scene {
    return this.sceneViewModel.Scene;
  }
}
