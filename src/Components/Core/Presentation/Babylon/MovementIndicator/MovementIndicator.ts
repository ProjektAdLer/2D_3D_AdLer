import {
  Mesh,
  StandardMaterial,
  Animation,
  Color3,
  MeshBuilder,
  Vector3,
} from "@babylonjs/core";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import bind from "bind-decorator";
import IMovementIndicator from "./IMovementIndicator";
import { injectable } from "inversify";

@injectable()
export default class MovementIndicator implements IMovementIndicator {
  private scenePresenter: IScenePresenter;
  private mesh: Mesh;

  constructor() {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    this.setup();
  }

  private setup() {
    // create mesh
    this.mesh = MeshBuilder.CreateTorus(
      "movementIndicator",
      { diameter: 0.2, thickness: 0.03 },
      this.scenePresenter.Scene
    );
    const material = new StandardMaterial(
      "movementIndicatorMaterial",
      this.scenePresenter.Scene
    );
    material.diffuseColor = new Color3(0.66, 0.83, 0.98);
    this.mesh.material = material;
    this.mesh.isVisible = false;

    // create animations
    const animationX = new Animation(
      "movementIndicatorAnimation",
      "scaling.x",
      100,
      Animation.ANIMATIONTYPE_FLOAT
    );
    const animationZ = new Animation(
      "movementIndicatorAnimation",
      "scaling.z",
      100,
      Animation.ANIMATIONTYPE_FLOAT
    );
    this.mesh.isVisible = false;

    animationX.setKeys([
      { frame: 0, value: 1 },
      { frame: 50, value: 2 },
      { frame: 100, value: 1 },
    ]);
    animationZ.setKeys([
      { frame: 0, value: 1 },
      { frame: 50, value: 2 },
      { frame: 100, value: 1 },
    ]);
    this.mesh.animations = [animationX, animationZ];
  }

  public display(position: Vector3, loopUntilHidden: boolean = true) {
    this.mesh.position = position;
    this.mesh.isVisible = true;

    this.scenePresenter.Scene.beginAnimation(
      this.mesh,
      0,
      100,
      loopUntilHidden,
      1,
      loopUntilHidden ? undefined : this.hide
    );
  }

  @bind
  public hide() {
    this.mesh.isVisible = false;
    this.scenePresenter.Scene.stopAnimation(this.mesh);
  }
}
