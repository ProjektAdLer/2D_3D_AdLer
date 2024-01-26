import { injectable } from "inversify";
import IAvatarCameraPresenter from "./IAvatarCameraPresenter";
import AvatarCameraViewModel from "./AvatarCameraViewModel";

@injectable()
export default class AvatarCameraPresenter implements IAvatarCameraPresenter {
  constructor(private viewModel: AvatarCameraViewModel) {}

  onStoryElementCutSceneTriggered(enableInput: boolean): void {
    this.viewModel.camera.Value.detachControl();
    // zooms camera in
    this.viewModel.camera.Value.radius = this.viewModel.lowerRadiusLimit;
  }

  onStoryElementCutSceneFinished(): void {
    this.viewModel.camera.Value.attachControl();
  }
}
