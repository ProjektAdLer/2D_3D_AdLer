import { LinesMesh, MeshBuilder, PointerEventTypes } from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import INavigation from "../Navigation/INavigation";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

export default class AvatarController implements IAvatarController {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;
  private pathLine: LinesMesh;

  constructor(private viewModel: AvatarViewModel) {
    this.scenePresenter = CoreDIContainer.get<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    );
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);

    this.scenePresenter.Scene.onPointerObservable.add((pointerInfo) => {
      if (
        pointerInfo.type === PointerEventTypes.POINTERDOWN &&
        pointerInfo.event.button === 2 &&
        pointerInfo.pickInfo?.hit
      ) {
        this.pointerDown();
      }
    });
  }

  private pointerDown() {
    let startingPoint = this.getGroundPosition();
    if (startingPoint) {
      this.navigation.Crowd.agentGoto(
        this.viewModel.agentIndex,
        this.navigation.Plugin.getClosestPoint(startingPoint)
      );

      if (process.env.REACT_APP_IS_DEBUG === "true") {
        let pathPoints = this.navigation.Plugin.computePath(
          this.navigation.Crowd.getAgentPosition(this.viewModel.agentIndex),
          this.navigation.Plugin.getClosestPoint(startingPoint)
        );
        this.pathLine = MeshBuilder.CreateDashedLines(
          "navigation path",
          { points: pathPoints, updatable: true, instance: this.pathLine },
          this.scenePresenter.Scene
        );
      }
    }
  }

  private getGroundPosition() {
    let pickinfo = this.scenePresenter.Scene.pick(
      this.scenePresenter.Scene.pointerX,
      this.scenePresenter.Scene.pointerY
    );
    if (pickinfo?.hit) {
      return pickinfo.pickedPoint;
    }
    return null;
  }
}
