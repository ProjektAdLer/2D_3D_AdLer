import IDoorLogic from "./IDoorLogic";
import DoorViewModel from "../DoorViewModel";
import { AnimationGroup, Sound } from "@babylonjs/core";
import IScenePresenter from "../../SceneManagement/IScenePresenter";

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

  open(onAnimationEnd?: () => void): void {
    if (this.openDoorAnimationGroup) {
      if (onAnimationEnd) {
        this.openDoorAnimationGroup.onAnimationEndObservable.addOnce(() => {
          onAnimationEnd();
        });
      }
      this.openDoorAnimationGroup.play(false);
    }
    if (this.openTheDoorSound) {
      this.openTheDoorSound.play();
    }
  }

  close(): void {
    if (this.openDoorAnimationGroup) {
      this.openDoorAnimationGroup.speedRatio = -1;
      this.openDoorAnimationGroup.play(false);
    }
  }
}
