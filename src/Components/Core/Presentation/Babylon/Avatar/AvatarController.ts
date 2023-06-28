import {
  ArcRotateCamera,
  EventState,
  KeyboardEventTypes,
  KeyboardInfo,
  LinesMesh,
  MeshBuilder,
  PointerEventTypes,
  PointerInfo,
  Vector3,
} from "@babylonjs/core";
import bind from "bind-decorator";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import { config } from "../../../../../config";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import INavigation from "../Navigation/INavigation";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

const validKeys = ["w", "a", "s", "d"];

export default class AvatarController implements IAvatarController {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;
  private pathLine: LinesMesh;

  constructor(private viewModel: AvatarViewModel) {
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    this.scenePresenter.Scene.onPointerObservable.add(this.processPointerEvent);
    this.scenePresenter.Scene.onKeyboardObservable.add(
      this.processKeyboardEvent
    );
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.applyInputs);
  }

  @bind
  private applyInputs(): void {
    if (!this.viewModel.keyMovementTarget.equals(Vector3.Zero())) {
      if (this.viewModel.pointerMovementThreshold)
        this.navigation.Crowd.agentGoto(
          this.viewModel.agentIndex,
          this.navigation.Plugin.getClosestPoint(
            this.viewModel.parentNode.position.add(
              this.viewModel.keyMovementTarget
            )
          )
        );

      this.debug_drawPath(this.viewModel.keyMovementTarget);

      this.viewModel.keyMovementTarget = Vector3.Zero();
    } else if (!this.viewModel.pointerMovementTarget.equals(Vector3.Zero())) {
      const targetOnNavMesh = this.navigation.Plugin.getClosestPoint(
        this.viewModel.pointerMovementTarget
      );
      const movementDistance = targetOnNavMesh
        .subtract(this.viewModel.parentNode.position)
        .length();

      if (movementDistance > this.viewModel.pointerMovementThreshold)
        this.navigation.Crowd.agentGoto(
          this.viewModel.agentIndex,
          targetOnNavMesh
        );

      this.debug_drawPath(this.viewModel.pointerMovementTarget);
    }
    this.viewModel.pointerMovementTarget = Vector3.Zero();
    this.viewModel.keyMovementTarget = Vector3.Zero();
  }

  @bind
  private processKeyboardEvent(
    eventData: KeyboardInfo,
    eventState: EventState
  ) {
    if (
      eventData.type !== KeyboardEventTypes.KEYDOWN ||
      !validKeys.includes(eventData.event.key)
    )
      return;

    this.viewModel.keyMovementTarget = this.viewModel.keyMovementTarget
      .add(
        this.viewModel.parentNode
          .getChildren<ArcRotateCamera>()![0]
          .getDirection(this.getReferenceAxisByKey(eventData.event.key))
          .normalize()
      )
      .normalize();
  }

  private getReferenceAxisByKey(key: string): Vector3 {
    switch (key) {
      case "w":
        return Vector3.Up();
      case "a":
        return Vector3.Left();
      case "s":
        return Vector3.Down();
      case "d":
        return Vector3.Right();
    }
    return Vector3.Zero();
  }

  @bind
  private processPointerEvent(pointerInfo: PointerInfo) {
    if (
      pointerInfo.type !== PointerEventTypes.POINTERTAP ||
      pointerInfo.pickInfo === null ||
      pointerInfo.pickInfo.pickedPoint === null
    )
      return;

    this.viewModel.pointerMovementTarget = pointerInfo.pickInfo.pickedPoint;
  }

  private debug_drawPath(target: Vector3): void {
    if (config.isDebug === false) return;

    let pathPoints = this.navigation.Plugin.computePath(
      this.navigation.Crowd.getAgentPosition(this.viewModel.agentIndex),
      this.navigation.Plugin.getClosestPoint(target)
    );
    this.pathLine = MeshBuilder.CreateDashedLines(
      "navigation path",
      { points: pathPoints, updatable: true, instance: this.pathLine },
      this.scenePresenter.Scene
    );
  }
}
