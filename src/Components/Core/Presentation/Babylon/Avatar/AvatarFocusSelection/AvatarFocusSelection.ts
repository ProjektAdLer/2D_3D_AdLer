import Observable from "src/Lib/Observable";
import IAvatarPresenter from "../IAvatarPresenter";
import IAvatarFokusable, { FocusableTypes } from "./IAvatarFocusable";
import IAvatarFocusSelection from "./IAvatarFokusSelection";
import { injectable } from "inversify";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import LearningSpaceSceneDefinition from "../../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import bind from "bind-decorator";
import {
  Color3,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { config } from "src/config";
import IScenePresenter from "../../SceneManagement/IScenePresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

@injectable()
export default class AvatarFocusSelection implements IAvatarFocusSelection {
  private readonly squaredInteractionDistance: number = 1.6 ** 2; // squared distance for performance, change first value to change distance
  private readonly squaredAvatarMovementThreshold: number = 0.05 ** 2;

  private scenePresenter: IScenePresenter;

  private focusables: IAvatarFokusable[] = [];
  private avatarPresenter: IAvatarPresenter | null = null;
  private lastUpdateAvatarPosition: Vector3 | null = null;
  private specialFocus: boolean = false;

  readonly CurrentFocus: Observable<Readonly<IAvatarFokusable | null>> =
    new Observable<Readonly<IAvatarFokusable | null>>(null);

  constructor() {
    this.scenePresenter = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    )(LearningSpaceSceneDefinition);

    this.scenePresenter.Scene.onBeforeRenderObservable.add(
      this.setupOnBeforeFirstFrame,
      undefined,
      false,
      undefined,
      true, // unregister after first call
    );
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.updateFocus);
    this.scenePresenter.Scene.onDisposeObservable.add(this.cleanup);
  }

  registerAvatarPresenter(avatarPresenter: IAvatarPresenter): void {
    this.avatarPresenter = avatarPresenter;
  }

  registerFocusable(focusable: IAvatarFokusable): void {
    this.focusables.push(focusable);
  }

  isInFocus(focusable: IAvatarFokusable): boolean {
    return this.CurrentFocus.Value === focusable;
  }

  hasSpecialFocus(): boolean {
    return this.specialFocus;
  }

  setStorySpecialFocus(type: FocusableTypes | undefined): void {
    // set special focus based on type
    this.focusables.forEach((focusable) => {
      if (focusable.getType && focusable.getType() !== null) {
        focusable.onSpecialFocused && focusable.onSpecialFocused();
        this.specialFocus = true;
      } else {
        focusable.onSpecialUnfocused && focusable.onSpecialUnfocused();
      }
      if (type === undefined) {
        this.specialFocus = false;
      }
    });
  }

  setSpecialFocus(
    id: number | undefined,
    type: FocusableTypes | undefined,
  ): void {
    this.focusables.forEach((focusable) => {
      const ids = focusable.getID ? focusable.getID() : null;
      if (
        id !== undefined &&
        type !== undefined &&
        ids !== null &&
        ids.id === id &&
        ids.type === type
      ) {
        focusable.onSpecialFocused && focusable.onSpecialFocused();
        this.specialFocus = true;
      } else {
        focusable.onSpecialUnfocused && focusable.onSpecialUnfocused();
      }

      if (id === undefined && type === undefined) {
        this.specialFocus = false;
      }
    });
  }

  @bind
  private setupOnBeforeFirstFrame(): void {
    this.lastUpdateAvatarPosition = this.avatarPresenter!.AvatarPosition;

    /* istanbul ignore next */
    if (config.isDebug)
      this.focusables.forEach((focusable) => {
        this.debug_drawInteractionRadius(
          focusable.getFocusableCenterPosition(),
        );
      });
  }

  @bind
  private updateFocus(): void {
    // skip update without avatar or focusables
    if (!this.avatarPresenter || this.focusables.length === 0) return;

    const currentAvatarPosition = this.avatarPresenter.AvatarPosition;

    // skip update if avatar has not moved enough
    if (
      this.lastUpdateAvatarPosition &&
      currentAvatarPosition &&
      Vector3.DistanceSquared(
        this.lastUpdateAvatarPosition,
        currentAvatarPosition,
      ) < this.squaredAvatarMovementThreshold
    ) {
      return;
    }
    this.lastUpdateAvatarPosition = currentAvatarPosition;

    // determine closest focusable
    let newFocus: IAvatarFokusable | null = null;
    let shortestDistance = this.squaredInteractionDistance;
    for (let i = 0; i < this.focusables.length; i++) {
      const distance = Vector3.DistanceSquared(
        currentAvatarPosition,
        this.focusables[i].getFocusableCenterPosition(),
      ); // use squared distance for performance

      if (distance < shortestDistance) {
        newFocus = this.focusables[i];
        shortestDistance = distance;
      }
    }

    // change focus and notify focusables
    if (newFocus !== this.CurrentFocus.Value) {
      this.CurrentFocus.Value?.onUnfocused &&
        this.CurrentFocus.Value.onUnfocused();

      this.CurrentFocus.Value = newFocus;

      this.CurrentFocus.Value?.onFocused && this.CurrentFocus.Value.onFocused();
    }
  }

  @bind
  private cleanup(): void {
    this.scenePresenter.Scene.onBeforeRenderObservable.removeCallback(
      this.updateFocus,
    );

    this.focusables = [];
    this.avatarPresenter = null;

    CoreDIContainer.rebind(PRESENTATION_TYPES.IAvatarFocusSelection)
      .to(AvatarFocusSelection)
      .inSingletonScope();
  }

  /* istanbul ignore next */
  private debug_drawInteractionRadius(position: Vector3) {
    if (!config.isDebug) return;

    const point = MeshBuilder.CreateSphere(
      "focusableCenter",
      {
        diameter: 0.1,
      },
      this.scenePresenter.Scene,
    );
    const circle = MeshBuilder.CreateTorus(
      "focusableInteractionRadius",
      {
        diameter: Math.sqrt(this.squaredInteractionDistance) * 2,
        thickness: 0.01,
        tessellation: 64,
      },
      this.scenePresenter.Scene,
    );

    point.position = position;
    circle.position = position;
    const material = new StandardMaterial(
      "material",
      this.scenePresenter.Scene,
    );
    material.diffuseColor = Color3.Teal();
    circle.material = material;
    point.material = material;
  }
}
