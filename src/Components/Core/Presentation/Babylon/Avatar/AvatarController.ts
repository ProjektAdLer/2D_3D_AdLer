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
import IMovementIndicator from "../MovementIndicator/IMovementIndicator";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

const validKeys = ["w", "a", "s", "d"];

export default class AvatarController implements IAvatarController {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;
  private pathLine: LinesMesh;
  private movementIndicator: IMovementIndicator;

  constructor(private viewModel: AvatarViewModel) {
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    this.movementIndicator = CoreDIContainer.get<IMovementIndicator>(
      PRESENTATION_TYPES.IMovementIndicator
    );

    this.scenePresenter.Scene.onPointerObservable.add(this.processPointerEvent);
    this.scenePresenter.Scene.onKeyboardObservable.add(
      this.processKeyboardEvent
    );
    this.scenePresenter.Scene.onBeforeRenderObservable.add(
      this.onPreSceneRender
    );
  }

  @bind
  private onPreSceneRender() {
    this.resetMovementIndicator();
    this.applyInputs();
  }

  private applyInputs(): void {
    if (this.viewModel.keyMovementTarget !== null) {
      this.navigation.Crowd.agentGoto(
        this.viewModel.agentIndex,
        this.viewModel.keyMovementTarget
      );
      this.viewModel.finalMovementTarget = this.viewModel.keyMovementTarget;

      this.debug_drawPath(this.viewModel.keyMovementTarget);
    } else if (this.viewModel.pointerMovementTarget !== null) {
      const movementDistance = this.viewModel.pointerMovementTarget
        .subtract(this.viewModel.parentNode.position)
        .length();

      if (movementDistance > this.viewModel.pointerMovementThreshold) {
        this.navigation.Crowd.agentGoto(
          this.viewModel.agentIndex,
          this.viewModel.pointerMovementTarget
        );
        this.viewModel.finalMovementTarget =
          this.viewModel.pointerMovementTarget;

        this.movementIndicator.display(this.viewModel.pointerMovementTarget);

        this.debug_drawPath(this.viewModel.pointerMovementTarget);
      }
    }
    this.viewModel.pointerMovementTarget = null;
    this.viewModel.keyMovementTarget = null;
  }

  private resetMovementIndicator(): void {
    if (
      this.viewModel.finalMovementTarget !== null &&
      this.viewModel.parentNode.position.equalsWithEpsilon(
        this.viewModel.finalMovementTarget,
        0.5
      )
    ) {
      this.movementIndicator.hide();
      this.viewModel.finalMovementTarget = null;
    }
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

    const baseTarget =
      this.viewModel.keyMovementTarget !== null
        ? this.viewModel.keyMovementTarget
        : Vector3.Zero();
    this.viewModel.keyMovementTarget = baseTarget
      .add(
        this.viewModel.parentNode
          .getChildren<ArcRotateCamera>()![0]
          .getDirection(this.getReferenceAxisByKey(eventData.event.key))
          .normalize()
      )
      .normalize();
    this.viewModel.keyMovementTarget = this.navigation.Plugin.getClosestPoint(
      this.viewModel.keyMovementTarget
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

    this.viewModel.pointerMovementTarget =
      this.navigation.Plugin.getClosestPoint(pointerInfo.pickInfo.pickedPoint);
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
