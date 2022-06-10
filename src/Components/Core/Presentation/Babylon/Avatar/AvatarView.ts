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

    // setup event callback for internal navigation setup after global scene navigation setup is completed
    this.scenePresenter.onNavigationReadyObservable.add(
      this.setupAvatarNavigation
    );
  }

  @bind
  private setupAvatarNavigation(): void {
    this.viewModel.agentIndex = this.scenePresenter.NavigationCrowd.addAgent(
      this.viewModel.meshes.Value[0].position,
      this.viewModel.agentParams,
      this.viewModel.meshes.Value[0]
    );
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.moveAvatar);

    this.scenePresenter.onNavigationReadyObservable.removeCallback(
      this.setupAvatarNavigation
    );
  }

  @bind
  private moveAvatar(): void {
    if (this.viewModel.meshes.Value.length > 0) {
      this.viewModel.meshes.Value[0].position =
        this.scenePresenter.NavigationCrowd.getAgentPosition(
          this.viewModel.agentIndex
        );
      let vel = this.scenePresenter.NavigationCrowd.getAgentVelocity(
        this.viewModel.agentIndex
      );
      if (vel.length() > 0.2) {
        vel.normalize();
        let desiredRotation = Math.atan2(vel.x, vel.z);
        this.viewModel.meshes.Value[0].rotation.y =
          this.viewModel.meshes.Value[0].rotation.y +
          (desiredRotation - this.viewModel.meshes.Value[0].rotation.y) * 0.05;
      }
    }
  }
}
