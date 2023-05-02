import bind from "bind-decorator";
import AvatarCameraViewModel from "./AvatarCameraViewModel";
import IAvatarCameraController from "./IAvatarCameraController";
import { ArcRotateCamera } from "@babylonjs/core";

export default class AvatarCameraController implements IAvatarCameraController {
  constructor(private viewModel: AvatarCameraViewModel) {
    this.viewModel.camera.subscribe(this.applyCameraControls);
  }

  @bind
  private applyCameraControls(camera: ArcRotateCamera): void {
    // add camera zoom
    camera.lowerRadiusLimit = this.viewModel.lowerRadiusLimit;
    camera.upperRadiusLimit = this.viewModel.upperRadiusLimit;
    camera.inputs.attached.mousewheel.attachControl();
    camera.wheelDeltaPercentage = this.viewModel.wheelDeltaPercentage;

    // // old (currently unneeded) camera rotation
    camera.upperBetaLimit = this.viewModel.upperBetaLimit;
    // camera.inputs.attached.pointers.attachControl();
    // // only rotate with the left mouse button (index: 0)
    // (camera.inputs.attached.pointers as ArcRotateCameraPointersInput).buttons =
    //   this.viewModel.rotationButtons;
  }
}
