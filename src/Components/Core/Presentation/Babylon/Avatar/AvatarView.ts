import {
  Axis,
  LinesMesh,
  MeshBuilder,
  Quaternion,
  Vector3,
} from "@babylonjs/core";
import bind from "bind-decorator";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import INavigation from "../Navigation/INavigation";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

// debug: used for debug method
let velocityLine: LinesMesh;
let counter: number = 0;

export default class AvatarView {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {
    this.scenePresenter = CoreDIContainer.get<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    );
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);

    // setup event callback for internal navigation setup after global scene navigation setup is completed
    this.navigation.onNavigationReadyObservable.subscribe(
      this.setupAvatarNavigation
    );
  }

  @bind
  private setupAvatarNavigation(): void {
    this.viewModel.agentIndex = this.navigation.Crowd.addAgent(
      this.viewModel.meshes.Value[0].position,
      this.viewModel.agentParams,
      this.viewModel.meshes.Value[0]
    );
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.moveAvatar);

    this.navigation.onNavigationReadyObservable.unsubscribe(
      this.setupAvatarNavigation
    );
  }

  @bind
  private moveAvatar(): void {
    if (this.viewModel.meshes.Value.length > 0) {
      this.viewModel.meshes.Value[0].position =
        this.navigation.Crowd.getAgentPosition(this.viewModel.agentIndex);
      let velocity = this.navigation.Crowd.getAgentVelocity(
        this.viewModel.agentIndex
      );

      if (velocity.length() > 0.2) {
        velocity.normalize();
        let desiredRotation = Math.atan2(velocity.x, velocity.z);

        this.debug_displayVelocity(velocity, desiredRotation);

        this.viewModel.meshes.Value[0].rotationQuaternion =
          Quaternion.RotationAxis(Axis.Y, desiredRotation);
      }
    }
  }

  // debug: this needs to be extracted from the class and to not be in the build
  private debug_displayVelocity(velocity: Vector3, rotation: number): void {
    if (counter % 10 === 0) {
      let points: Vector3[] = [
        this.viewModel.meshes.Value[0].position,
        this.viewModel.meshes.Value[0].position.add(velocity),
      ];
      velocityLine = MeshBuilder.CreateDashedLines(
        "avatar velocity",
        {
          points: points,
          updatable: true,
          instance: velocityLine,
        },
        this.scenePresenter.Scene
      );
      console.log(
        velocity.toString() +
          " " +
          rotation +
          " " +
          this.viewModel.meshes.Value[0].rotationQuaternion?.y
      );
    }
    counter++;
  }
}
