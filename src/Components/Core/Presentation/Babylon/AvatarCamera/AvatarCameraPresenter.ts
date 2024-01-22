import { injectable } from "inversify";
import IAvatarCameraPresenter from "./IAvatarCameraPresenter";
import AvatarCameraViewModel from "./AvatarCameraViewModel";
import bind from "bind-decorator";
import { ArcRotateCamera, ArcRotateCameraPointersInput } from "@babylonjs/core";

@injectable()
export default class AvatarCameraPresenter implements IAvatarCameraPresenter {
  constructor(private viewModel: AvatarCameraViewModel) {}

  onStoryElementCutSceneTriggered(enableInput: boolean): void {
    if (enableInput) {
      this.viewModel.camera.Value.attachControl();
    } else {
      this.viewModel.camera.Value.detachControl();
      // zooms camera in
      this.viewModel.camera.Value.radius = this.viewModel.lowerRadiusLimit;
    }
  }
}
