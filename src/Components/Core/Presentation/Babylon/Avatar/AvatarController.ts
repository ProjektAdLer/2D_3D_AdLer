import {
  LinesMesh,
  MeshBuilder,
  PointerEventTypes,
  PointerInfo,
} from "@babylonjs/core";
import bind from "bind-decorator";
import { config } from "../../../../../config";
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

    this.scenePresenter.Scene.onPointerObservable.add(this.processPointerEvent);
  }

  @bind
  private processPointerEvent(pointerInfo: PointerInfo) {
    // quit if not right mouse button down or if no mesh was hit
    if (
      pointerInfo.type !== PointerEventTypes.POINTERDOWN ||
      pointerInfo.event.button !== 2 ||
      pointerInfo.pickInfo === null ||
      pointerInfo.pickInfo.pickedPoint === null
    )
      return;

    // set target in navigation crowd
    this.navigation.Crowd.agentGoto(
      this.viewModel.agentIndex,
      this.navigation.Plugin.getClosestPoint(pointerInfo.pickInfo.pickedPoint)
    );

    // debug: draw path line
    if (config.isDebug === true) {
      let pathPoints = this.navigation.Plugin.computePath(
        this.navigation.Crowd.getAgentPosition(this.viewModel.agentIndex),
        this.navigation.Plugin.getClosestPoint(pointerInfo.pickInfo.pickedPoint)
      );
      this.pathLine = MeshBuilder.CreateDashedLines(
        "navigation path",
        { points: pathPoints, updatable: true, instance: this.pathLine },
        this.scenePresenter.Scene
      );
    }
  }
}
