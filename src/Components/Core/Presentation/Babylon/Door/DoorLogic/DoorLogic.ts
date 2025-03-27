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
  private openDoorAnimationGroup: AnimationGroup;
  private setDoorOpenAnimationGroup: AnimationGroup;
  private openTheDoorSound: Sound;

  constructor(
    private viewModel: DoorViewModel,
    private scenePresenter: IScenePresenter,
  ) {
    this.setupDoorAnimation();
    this.setupDoorSound();
    if (this.viewModel.isOpen.Value) {
      this.setDoorOpen();
    }
  }

  private setupDoorAnimation(): void {
    this.viewModel.doorAnimations?.forEach((animationGroup) => {
      if (animationGroup.children) {
        animationGroup.stop();
        switch (animationGroup.name) {
          case "door_open":
            this.openDoorAnimationGroup = animationGroup;
            break;
          case "door_open_idle":
            this.setDoorOpenAnimationGroup = animationGroup;
            break;
        }
      }
    });
  }

  private setupDoorSound(): void {
    this.openTheDoorSound = new Sound(
      "openTheDoor",
      soundLink,
      this.scenePresenter.Scene,
    );
    this.openTheDoorSound.setVolume(0.5);
  }

  setDoorOpen(): void {
    this.setDoorOpenAnimationGroup?.play(false);
  }

  open(): void {
    if (this.openDoorAnimationGroup) {
      this.openDoorAnimationGroup.play(false);
    }
    if (this.openTheDoorSound) {
      this.openTheDoorSound.play();
    }
  }
}
