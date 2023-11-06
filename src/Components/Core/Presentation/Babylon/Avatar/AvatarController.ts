import {
  ArcRotateCamera,
  EventState,
  KeyboardEventTypes,
  KeyboardInfo,
  LinesMesh,
  MeshBuilder,
  Nullable,
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
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";

const validKeys = ["w", "a", "s", "d"];

export default class AvatarController implements IAvatarController {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;
  private pathLine: LinesMesh;
  private worldPort: ILearningWorldPort;

  private keyMovementTarget: Nullable<Vector3> = null;
  private pointerMovementTarget: Nullable<Vector3> = null;
  private lastFramePosition: Nullable<Vector3> = null;

  constructor(private viewModel: AvatarViewModel) {
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
    this.worldPort = CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    );
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    this.scenePresenter.Scene.onPointerObservable.add(this.processPointerEvent);
    // this.scenePresenter.Scene.onKeyboardObservable.add(
    //   this.processKeyboardEvent
    // );
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.applyInputs);
    this.scenePresenter.Scene.onAfterRenderObservable.add(
      this.broadcastNewAvatarPosition
    );
  }

  @bind
  private applyInputs(): void {
    if (this.keyMovementTarget !== null) {
      this.navigation.Crowd.agentGoto(
        this.viewModel.agentIndex,
        this.keyMovementTarget
      );
      this.viewModel.movementTarget.Value = this.keyMovementTarget;

      this.debug_drawPath(this.keyMovementTarget);
    } else if (this.pointerMovementTarget !== null) {
      const movementDistance = this.pointerMovementTarget
        .subtract(this.viewModel.parentNode.position)
        .length();

      if (movementDistance > this.viewModel.pointerMovementThreshold) {
        this.navigation.Crowd.agentGoto(
          this.viewModel.agentIndex,
          this.pointerMovementTarget
        );
        this.viewModel.movementTarget.Value = this.pointerMovementTarget;

        this.debug_drawPath(this.pointerMovementTarget);
      }
    }
    this.pointerMovementTarget = null;
    this.keyMovementTarget = null;
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

    const baseTarget = this.keyMovementTarget ?? Vector3.Zero();
    this.keyMovementTarget = baseTarget
      .add(
        this.viewModel.parentNode
          .getChildren<ArcRotateCamera>()![0]
          .getDirection(this.getReferenceAxisByKey(eventData.event.key))
          .normalize()
      )
      .normalize();
    this.keyMovementTarget = this.navigation.Plugin.getClosestPoint(
      this.keyMovementTarget
    );
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

    this.pointerMovementTarget = this.navigation.Plugin.getClosestPoint(
      pointerInfo.pickInfo.pickedPoint.multiplyByFloats(1, 0, 1)
    );
  }

  @bind
  private broadcastNewAvatarPosition(): void {
    if (
      this.lastFramePosition === null ||
      Vector3.Distance(
        this.lastFramePosition,
        this.viewModel.parentNode.position
      ) > 0.1
    ) {
      this.worldPort.onAvatarPositionChanged(
        this.viewModel.parentNode.position,
        2
      );
      this.lastFramePosition = this.viewModel.parentNode.position;
    }
  }

  private debug_drawPath(target: Vector3): void {
    if (config.isDebug === false) return;

    let pathPoints = this.navigation.Plugin.computePath(
      this.navigation.Crowd.getAgentPosition(this.viewModel.agentIndex),
      target
    );
    this.pathLine = MeshBuilder.CreateDashedLines(
      "navigation path",
      { points: pathPoints, updatable: true, instance: this.pathLine },
      this.scenePresenter.Scene
    );
  }
}
