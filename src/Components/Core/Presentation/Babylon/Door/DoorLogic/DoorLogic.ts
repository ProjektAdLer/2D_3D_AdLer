import IDoorLogic from "./IDoorLogic";
import DoorViewModel from "../DoorViewModel";
import { AnimationGroup } from "@babylonjs/core";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

const soundLink = require("../../../../../../Assets/Sounds/door_opening.mp3");

export default class DoorLogic implements IDoorLogic {
  private openDoorAnimationGroup: AnimationGroup;
  private setDoorOpenAnimationGroup: AnimationGroup;
  private openTheDoorAudio = new Audio(soundLink);
  private settings;
  constructor(private viewModel: DoorViewModel) {
    this.settings = CoreDIContainer.get<IGetSettingsConfigUseCase>(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    ).execute();
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
    this.openTheDoorAudio.volume = this.settings.volume ?? 0.5;
  }

  setDoorOpen(): void {
    this.setDoorOpenAnimationGroup?.play(false);
  }

  open(onAnimationEnd?: () => void): void {
    if (this.openDoorAnimationGroup) {
      this.openDoorAnimationGroup.speedRatio = 1;

      if (onAnimationEnd) {
        this.openDoorAnimationGroup.onAnimationEndObservable.addOnce(() => {
          onAnimationEnd();
        });
      }

      if (!this.openDoorAnimationGroup.isPlaying) {
        this.openDoorAnimationGroup.play(false);
      } else if (onAnimationEnd) {
        setTimeout(() => {
          onAnimationEnd();
        }, 100);
      }
    } else if (onAnimationEnd) {
      setTimeout(() => {
        onAnimationEnd();
      }, 100);
    }

    this.openTheDoorAudio.play();
  }

  close(): void {
    if (this.openDoorAnimationGroup) {
      this.openDoorAnimationGroup.speedRatio = -1;
      this.openDoorAnimationGroup.onAnimationEndObservable.addOnce(() => {
        this.openDoorAnimationGroup.stop();
      });
      this.openDoorAnimationGroup.play(false);
    }
  }
}
