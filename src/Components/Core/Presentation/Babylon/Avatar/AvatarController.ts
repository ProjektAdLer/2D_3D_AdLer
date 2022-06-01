import { LinesMesh, MeshBuilder, PointerEventTypes } from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

export default class AvatarController implements IAvatarController {
  private scenePresenter: IScenePresenter;
  private pathLine: LinesMesh;

  constructor(private viewModel: AvatarViewModel) {
    this.scenePresenter = CoreDIContainer.get<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    );

    this.scenePresenter.Scene.onPointerObservable.add((pointerInfo) => {
      if (
        pointerInfo.type === PointerEventTypes.POINTERDOWN &&
        pointerInfo.pickInfo?.hit
      ) {
        this.pointerDown();
      }
    });
  }

  public pointerDown() {
    let startingPoint = this.getGroundPosition();
    if (startingPoint) {
      this.scenePresenter.NavigationCrowd.agentGoto(
        this.viewModel.agentIndex,
        this.scenePresenter.Navigation.getClosestPoint(startingPoint)
      );

      // debug: draw path as line
      var pathPoints = this.scenePresenter.Navigation.computePath(
        this.scenePresenter.NavigationCrowd.getAgentPosition(
          this.viewModel.agentIndex
        ),
        this.scenePresenter.Navigation.getClosestPoint(startingPoint)
      );
      this.pathLine = MeshBuilder.CreateDashedLines(
        "navigation path",
        { points: pathPoints, updatable: true, instance: this.pathLine },
        this.scenePresenter.Scene
      );
    }
  }

  private getGroundPosition() {
    var pickinfo = this.scenePresenter.Scene.pick(
      this.scenePresenter.Scene.pointerX,
      this.scenePresenter.Scene.pointerY
    );
    if (pickinfo?.hit) {
      return pickinfo.pickedPoint;
    }
    return null;
  }
}
