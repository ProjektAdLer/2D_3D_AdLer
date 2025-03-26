import IDoorLogic from "./IDoorLogic";
import DoorViewModel from "../DoorViewModel";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import { Animation, AnimationGroup, Sound, Tools } from "@babylonjs/core";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import IScenePresenter from "../../SceneManagement/IScenePresenter";
import CORE_TYPES from "~DependencyInjection/CoreTypes";

const soundLink = require("../../../../../../Assets/Sounds/door_opening.mp3");

export default class DoorLogic implements IDoorLogic {
  private logger: ILoggerPort;
  private doorAnimation: Animation;
  private doorAnimationGroup: AnimationGroup;
  private openTheDoorSound: Sound;

  constructor(
    private viewModel: DoorViewModel,
    private scenePresenter: IScenePresenter,
  ) {
    this.logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
    this.setupDoorAnimation();
    this.setupDoorSound();
    if (this.viewModel.isOpen.Value) {
      setTimeout(() => this.open(), 500);
    }
  }

  private setupDoorAnimation(): void {
    const meshToRotate = this.viewModel.meshes.find(
      (mesh) => mesh.id === "Door",
    );

    if (meshToRotate === undefined) {
      this.logger.log(
        LogLevelTypes.WARN,
        "DoorView: No submesh with name Door found. Door animation will not work.",
      );
      return;
    }

    this.doorAnimation = new Animation(
      "doorAnimation",
      "rotation.y",
      30,
      Animation.ANIMATIONTYPE_FLOAT,
    );

    const initialRotation = Tools.ToRadians(meshToRotate.rotation.y);
    this.doorAnimation.setKeys([
      { frame: 0, value: initialRotation },
      {
        frame: 45,
        value: initialRotation + Tools.ToRadians(80),
      },
    ]);

    meshToRotate.animations.push(this.doorAnimation);

    this.doorAnimationGroup = new AnimationGroup("doorAnimationGroup");
    this.doorAnimationGroup.addTargetedAnimation(
      this.doorAnimation,
      this.viewModel.meshes[0],
    );
    this.viewModel.doorAnimations.push(this.doorAnimationGroup);
  }

  private setupDoorSound(): void {
    this.openTheDoorSound = new Sound(
      "openTheDoor",
      soundLink,
      this.scenePresenter.Scene,
    );
    this.openTheDoorSound.setVolume(0.5);
  }

  open(): void {
    if (this.doorAnimationGroup) {
      this.doorAnimationGroup.play(false);
    }
    if (this.openTheDoorSound) {
      this.openTheDoorSound.play();
    }
  }
}
