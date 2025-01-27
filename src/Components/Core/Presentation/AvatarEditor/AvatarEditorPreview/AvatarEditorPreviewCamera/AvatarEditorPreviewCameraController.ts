import { ArcRotateCamera, ArcRotateCameraPointersInput } from "@babylonjs/core";
import AvatarEditorPreviewCameraViewModel from "./AvatarEditorPreviewCameraViewModel";
import IAvatarEditorPreviewCameraController from "./IAvatarEditorPreviewCameraController";
import bind from "bind-decorator";

export default class AvatarEditorPreviewCameraController
  implements IAvatarEditorPreviewCameraController
{
  constructor(private viewModel: AvatarEditorPreviewCameraViewModel) {
    this.viewModel.camera.subscribe(this.applyCameraControls);
  }

  @bind
  private applyCameraControls(camera: ArcRotateCamera): void {
    // attach controls
    camera.inputs.attached.mousewheel.attachControl();
    camera.inputs.attached.pointers.attachControl();

    // Empfindlichkeit für Pinch/Zoom verringern
    camera.pinchPrecision = 200; // höherer Wert = geringeres Zoom pro Geste
    // oder: camera.pinchDeltaPercentage = 0.002; // anpassen nach Bedarf

    const pointersInput = camera.inputs.attached
      .pointers as ArcRotateCameraPointersInput;
    pointersInput.multiTouchPanAndZoom = true;
    pointersInput.pinchZoom = true;

    // set camera limits
    camera.upperBetaLimit = this.viewModel.defaultBetaRotation;
    camera.lowerBetaLimit = this.viewModel.defaultBetaRotation;
    camera.lowerRadiusLimit = this.viewModel.lowerRadiusLimit;
    camera.upperRadiusLimit = this.viewModel.upperRadiusLimit;
    camera.wheelDeltaPercentage = this.viewModel.wheelDeltaPercentage;
  }
}
