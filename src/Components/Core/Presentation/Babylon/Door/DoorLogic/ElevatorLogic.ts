import { AnimationGroup } from "@babylonjs/core";
import IDoorLogic from "./IDoorLogic";
import DoorViewModel from "../DoorViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

const elevatorUpSoundLink = require("../../../../../../Assets/Sounds/ElevatorUp.mp3");

export default class ElevatorLogic implements IDoorLogic {
  private elevatorAnimationOpen: AnimationGroup;
  private elevatorAnimationLiftUp: AnimationGroup;
  private enableProximityBehaviour = false;
  private elevatorIsLifted: boolean = false;
  private elevatorUpSound = new Audio(elevatorUpSoundLink);
  private settings;

  constructor(private viewModel: DoorViewModel) {
    this.settings = CoreDIContainer.get<IGetSettingsConfigUseCase>(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    ).execute();
    this.setupElevatorAnimation();
    this.setupElevatorSound();
  }

  private setupElevatorSound(): void {
    this.elevatorUpSound.volume = this.settings.volume ?? 0.5;
  }

  private setupElevatorAnimation(): void {
    this.viewModel.doorAnimations?.forEach((animationGroup) => {
      if (animationGroup.children) {
        animationGroup.stop();
        switch (animationGroup.name) {
          case "elevator_open":
            this.elevatorAnimationOpen = animationGroup;
            break;
          case "elevator_drive_up_open":
            this.elevatorAnimationLiftUp = animationGroup;
            break;
        }
      }
    });
    //Play initial entry elevator animation on scene start
    if (!this.viewModel.isExit) {
      this.elevatorAnimationOpen?.play(false);
      this.elevatorIsLifted = true;
      this.enableProximityBehaviour = true;
    }
    //Enable ProximityBehaviour if exit elevator is set open
    if (this.viewModel.isOpen.Value && this.viewModel.isExit) {
      this.enableProximityBehaviour = true;
    }
  }

  open(onAnimationEnd?: () => void): void {
    if (this.elevatorAnimationLiftUp) {
      this.elevatorAnimationLiftUp.speedRatio = 1;
      this.elevatorAnimationLiftUp.play(false);
      this.elevatorAnimationLiftUp.onAnimationEndObservable.addOnce(() => {
        this.elevatorIsLifted = true;
        this.elevatorUpSound.play();
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      });
    }
  }

  close(): void {
    if (this.elevatorAnimationLiftUp) {
      this.elevatorAnimationLiftUp.speedRatio = -1;
      this.elevatorAnimationLiftUp.onAnimationEndObservable.addOnce(() => {
        this.elevatorAnimationLiftUp.stop();
        this.elevatorIsLifted = false;
      });
      this.elevatorAnimationLiftUp.play(false);
    }
  }

  avatarClose(): void {
    if (this.enableProximityBehaviour && !this.elevatorIsLifted) {
      this.elevatorAnimationLiftUp.speedRatio = 1;
      this.elevatorAnimationLiftUp?.play(false);
    }
  }

  avatarFar(): void {
    if (this.enableProximityBehaviour) {
      this.elevatorAnimationLiftUp.speedRatio = -1;
      this.elevatorAnimationLiftUp?.play(false);
      this.elevatorIsLifted = false;
    }
  }
}
