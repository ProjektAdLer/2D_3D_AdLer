import { Engine } from "@babylonjs/core";
import bind from "bind-decorator";
import { injectable, inject } from "inversify";
import ISceneView from "./ISceneView";
import SceneViewModel from "./SceneViewModel";

@injectable()
export default class SceneView implements ISceneView {
  private sceneViewModel: SceneViewModel;

  constructor(@inject(SceneViewModel) sceneViewModel: SceneViewModel) {
    this.sceneViewModel = sceneViewModel;
  }

  startRenderLoop(engine: Engine): void {
    engine.runRenderLoop(this.renderFunction);
  }

  @bind
  private renderFunction() {
    this.sceneViewModel.scene.render();
  }
}
