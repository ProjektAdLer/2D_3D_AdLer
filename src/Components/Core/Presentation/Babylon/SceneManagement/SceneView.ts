import bind from "bind-decorator";
import { injectable, inject } from "inversify";
import ISceneView from "./ISceneView";
import SceneViewModel from "./SceneViewModel";

@injectable()
export default class SceneView implements ISceneView {
  private viewModel: SceneViewModel;

  constructor(@inject(SceneViewModel) sceneViewModel: SceneViewModel) {
    this.viewModel = sceneViewModel;
  }

  startRenderLoop(): void {
    this.viewModel.scene.getEngine().runRenderLoop(this.renderFunction);
  }

  @bind
  private renderFunction() {
    this.viewModel.scene.render();
  }
}
