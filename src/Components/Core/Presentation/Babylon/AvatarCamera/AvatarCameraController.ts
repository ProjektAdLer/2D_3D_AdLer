import bind from "bind-decorator";
import AvatarCameraViewModel from "./AvatarCameraViewModel";
import IAvatarCameraController from "./IAvatarCameraController";
import { ArcRotateCamera, ArcRotateCameraPointersInput } from "@babylonjs/core";

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

    // add pointer controls for pinch zoom and rotation
    camera.inputs.attached.pointers.attachControl();
    const pointersInput = camera.inputs.attached
      .pointers as ArcRotateCameraPointersInput;
    pointersInput.multiTouchPanAndZoom = true;
    pointersInput.pinchZoom = true;
    pointersInput.buttons = this.viewModel.rotationButtons;

    // add keyboard controls for rotation
    camera.inputs.attached.keyboard.attachControl();
    camera.keysLeft = [81]; // Q
    camera.keysRight = [69]; // E

    // set camera properties
    camera.upperAlphaLimit =
      this.viewModel.defaultAlphaRotation + this.viewModel.alphaLimitOffset;
    camera.lowerAlphaLimit =
      this.viewModel.defaultAlphaRotation - this.viewModel.alphaLimitOffset;
    camera.upperBetaLimit = this.viewModel.defaultBetaRotation;
    camera.lowerBetaLimit = this.viewModel.defaultBetaRotation;
    camera.angularSensibilityX = this.viewModel.rotationSesibility;
    camera.panningSensibility = 0; // prevents panning
  }
}
