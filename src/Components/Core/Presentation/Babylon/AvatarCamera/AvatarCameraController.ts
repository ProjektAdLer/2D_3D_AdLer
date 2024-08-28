import bind from "bind-decorator";
import AvatarCameraViewModel from "./AvatarCameraViewModel";
import IAvatarCameraController from "./IAvatarCameraController";
import {
  ArcRotateCamera,
  ArcRotateCameraPointersInput,
  DeviceSourceManager,
  DeviceType,
} from "@babylonjs/core";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import type { DeviceSourceType } from "@babylonjs/core/DeviceInput/internalDeviceSourceManager";

export default class AvatarCameraController implements IAvatarCameraController {
  private scenePresenter: IScenePresenter;
  private deviceSourceManager: DeviceSourceManager;

  constructor(private viewModel: AvatarCameraViewModel) {
    this.viewModel.camera.subscribe(this.applyCameraControls);

    const factory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = factory(LearningSpaceSceneDefinition);

    this.deviceSourceManager = new DeviceSourceManager(
      this.scenePresenter.Scene.getEngine()
    );
  }

  @bind
  private updateCameraControls(device: DeviceSourceType): void {
    switch (device.deviceType) {
      case DeviceType.Mouse:
        (
          this.viewModel.camera.Value.inputs.attached
            .pointers as ArcRotateCameraPointersInput
        ).buttons = this.viewModel.rotationButtons;
        break;
      case DeviceType.Keyboard:
        this.viewModel.camera.Value.inputs.attached.keyboard.attachControl();
        break;
    }
  }

  @bind
  private applyCameraControls(camera: ArcRotateCamera): void {
    this.deviceSourceManager.onDeviceConnectedObservable.add(
      this.updateCameraControls
    );

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

    // setup keyboard rotation controls
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
