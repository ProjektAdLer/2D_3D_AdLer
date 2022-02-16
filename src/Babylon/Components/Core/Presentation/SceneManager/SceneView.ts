import { Engine } from "@babylonjs/core";
import { injectable, inject } from "inversify";
import ISceneView from "./ISceneView";
import SceneViewModel from "./SceneViewModel";

@injectable()
export default class SceneView implements ISceneView {
  private sceneViewModel: SceneViewModel;

  constructor(@inject(SceneViewModel) sceneViewModel: SceneViewModel) {
    this.sceneViewModel = sceneViewModel;
  }

  createRenderLoop(engine: Engine): void {
    engine.runRenderLoop(this.renderFunction);
  }

  private renderFunction() {
    this.sceneViewModel.Scene.render();
  }
}
