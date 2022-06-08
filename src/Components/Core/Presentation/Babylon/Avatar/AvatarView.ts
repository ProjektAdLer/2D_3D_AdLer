import { Mesh, SceneLoader, FollowCamera } from "@babylonjs/core";
import bind from "bind-decorator";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

export default class AvatarView {
  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {
    this.scenePresenter = CoreDIContainer.get<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    );

    // setup event callback for avatar animation
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.moveAvatar);
  }

  @bind
  private moveAvatar(): void {
    // if (this.viewModel.meshes.Value.length > 0) {
    //   this.viewModel.meshes.Value[0].position =
    //     this.scenePresenter.NavigationCrowd.getAgentPosition(0);
    //   let vel = this.scenePresenter.NavigationCrowd.getAgentVelocity(
    //     this.viewModel.agentIndex
    //   );
    //   if (vel.length() > 0.2) {
    //     vel.normalize();
    //     var desiredRotation = Math.atan2(vel.x, vel.z);
    //     this.viewModel.meshes.Value[0].rotation.y =
    //       this.viewModel.meshes.Value[0].rotation.y +
    //       (desiredRotation - this.viewModel.meshes.Value[0].rotation.y) * 0.05;
    //   }
    // }
  }
}
