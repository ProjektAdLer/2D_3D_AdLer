import bind from "bind-decorator";
import AvatarCameraViewModel from "./AvatarCameraViewModel";
import IAvatarCameraController from "./IAvatarCameraController";
import { ArcRotateCamera, ArcRotateCameraPointersInput } from "@babylonjs/core";
// import {} ArcRotateCameraPointersInput } from "@babylonjs/core";

export default class AvatarCameraController implements IAvatarCameraController {
  constructor(private viewModel: AvatarCameraViewModel) {
    this.viewModel.camera.subscribe(this.applyCameraControls);
  }

  @bind
  private applyCameraControls(camera: ArcRotateCamera): void {
    // add mouse wheel controls for zooming on desktop
    camera.inputs.attached.mousewheel.attachControl();
    camera.lowerRadiusLimit = this.viewModel.lowerRadiusLimit;
    camera.upperRadiusLimit = this.viewModel.upperRadiusLimit;
    camera.wheelDeltaPercentage = this.viewModel.wheelDeltaPercentage;

    // add pointer controls for pinch zoom
    camera.inputs.attached.pointers.attachControl();
    const pointersInput = camera.inputs.attached
      .pointers as ArcRotateCameraPointersInput;
    pointersInput.multiTouchPanAndZoom = true;
    pointersInput.pinchZoom = true;
    pointersInput.panningSensibility = 0;

    // clamp camera rotation to the default values to prevent panning
    camera.upperAlphaLimit = this.viewModel.defaultAlphaRotation;
    camera.lowerAlphaLimit = this.viewModel.defaultAlphaRotation;
    camera.upperBetaLimit = this.viewModel.defaultBetaRotation;
    camera.lowerBetaLimit = this.viewModel.defaultBetaRotation;

    // old (currently unneeded) camera rotation
    // camera.upperBetaLimit = this.viewModel.upperBetaLimit;
    // camera.inputs.attached.pointers.attachControl();
    // // only rotate with the left mouse button (index: 0)
    // (camera.inputs.attached.pointers as ArcRotateCameraPointersInput).buttons =
    //   this.viewModel.rotationButtons;
  }
}
