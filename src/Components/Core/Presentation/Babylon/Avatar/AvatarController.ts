import {
  ArcRotateCamera,
  EventState,
  KeyboardEventTypes,
  KeyboardInfo,
  Nullable,
  PointerEventTypes,
  PointerInfo,
  Vector3,
} from "@babylonjs/core";
import bind from "bind-decorator";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import INavigation from "../Navigation/INavigation";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";
import ILearningSpacePresenter from "../LearningSpaces/ILearningSpacePresenter";
import { FocusableTypes } from "./AvatarFocusSelection/IAvatarFocusable";

const validKeys = ["w", "a", "s", "d"];

export default class AvatarController implements IAvatarController {
  learningSpacePresenter: ILearningSpacePresenter; // set by builder

  private scenePresenter: IScenePresenter;
  private navigation: INavigation;

  private keyMovementTarget: Nullable<Vector3> = null;
  private pointerMovementTarget: Nullable<Vector3> = null;

  constructor(private viewModel: AvatarViewModel) {
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    this.scenePresenter.Scene.onPointerObservable.add(this.processPointerEvent);
    // this.scenePresenter.Scene.onKeyboardObservable.add(
    //   this.processKeyboardEvent
    // );
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.applyInputs);
  }

  @bind
  private applyInputs(): void {
    if (!this.viewModel.inputEnabled.Value) {
      return;
    }

    if (this.keyMovementTarget !== null) {
      this.viewModel.movementTarget.Value = this.keyMovementTarget;
      this.viewModel.characterNavigator.startMovement(
        this.keyMovementTarget,
        this.onMovementTargetReached,
      );
    } else if (this.pointerMovementTarget !== null) {
      const movementDistance = this.pointerMovementTarget
        .subtract(this.viewModel.parentNode.position)
        .length();

      if (movementDistance > this.viewModel.pointerMovementThreshold) {
        this.viewModel.movementTarget.Value = this.pointerMovementTarget;
        this.viewModel.characterNavigator.startMovement(
          this.pointerMovementTarget,
          this.onMovementTargetReached,
        );
      }
    }
    this.pointerMovementTarget = null;
    this.keyMovementTarget = null;
  }

  @bind
  private onMovementTargetReached(): void {
    this.viewModel.movementTarget.Value = null;
  }

  @bind
  private processKeyboardEvent(
    eventData: KeyboardInfo,
    eventState: EventState,
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
          .normalize(),
      )
      .normalize();
    this.keyMovementTarget = this.navigation.Plugin.getClosestPoint(
      this.keyMovementTarget,
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
    // abort if the pointer event is not a tap or if no collision was detected
    if (
      (pointerInfo.type !== PointerEventTypes.POINTERTAP &&
        pointerInfo.type !== PointerEventTypes.POINTERDOUBLETAP) ||
      pointerInfo.pickInfo === null ||
      pointerInfo.pickInfo.pickedPoint === null
    )
      return;

    if (
      this.viewModel.focusSelection.hasSpecialFocus() &&
      pointerInfo.type === PointerEventTypes.POINTERTAP
    ) {
      this.viewModel.focusSelection.setSpecialFocus(undefined, undefined);
    }

    if (pointerInfo.type === PointerEventTypes.POINTERDOUBLETAP) {
      const type =
        pointerInfo.pickInfo.pickedMesh?.name !== undefined
          ? parseInt(pointerInfo.pickInfo.pickedMesh?.name)
          : undefined;
      const id =
        pointerInfo.pickInfo.pickedMesh?.id !== undefined
          ? parseInt(pointerInfo.pickInfo.pickedMesh?.id)
          : undefined;
      if (type !== undefined && type in FocusableTypes && !Number.isNaN(id)) {
        this.viewModel.focusSelection.setSpecialFocus(id, type);
      } else if (type !== undefined && type in FocusableTypes) {
        this.viewModel.focusSelection.setStorySpecialFocus(type);
      }
    }

    // project the picked point to the ground and snap it to the navmesh
    const pickedPointOnGround =
      pointerInfo.pickInfo.pickedPoint.multiplyByFloats(1, 0, 1);
    const snappedPoint =
      this.navigation.Plugin.getClosestPoint(pickedPointOnGround);
    const distanceToSnappedPoint = Vector3.Distance(
      pickedPointOnGround,
      snappedPoint,
    );

    // if the snapped point is already on the navmesh (ie. close to the projected point), use it as the movement target
    if (distanceToSnappedPoint < 0.1) {
      this.pointerMovementTarget = snappedPoint;
    } else {
      // refine the movement target
      // take original snap as distance estimation from picked point to navmesh edge
      // adjust target in direction of avatar
      const pickedPointToAvatar =
        this.viewModel.parentNode.position.subtract(pickedPointOnGround);
      const pickedPointToAvatarNormalized = pickedPointToAvatar.normalize();
      const adjustedTarget = pickedPointToAvatarNormalized
        .scale(distanceToSnappedPoint)
        .add(pickedPointOnGround);

      // snap adjusted target to navmesh again
      this.pointerMovementTarget =
        this.navigation.Plugin.getClosestPoint(adjustedTarget);
    }
  }
}
