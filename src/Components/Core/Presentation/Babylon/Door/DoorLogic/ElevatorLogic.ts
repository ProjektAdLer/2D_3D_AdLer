import { AnimationGroup } from "@babylonjs/core";
import IDoorLogic from "./IDoorLogic";
import DoorViewModel from "../DoorViewModel";

export default class ElevatorLogic implements IDoorLogic {
  private elevatorAnimationOpen: AnimationGroup;
  private elevatorAnimationLiftUp: AnimationGroup;
  private elevatorAnimationLiftDown: AnimationGroup;
  private enableProximityBehaviour = false;
  private elevatorIsLifted: boolean = false;

  constructor(private viewModel: DoorViewModel) {
    this.setupElevatorAnimation();
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
          case "elevator_drive_down_close":
            this.elevatorAnimationLiftDown = animationGroup;
            break;
        }
      }
    });
    //Play initial entry elevator animation on scene start
    if (!this.viewModel.isExit) {
      this.elevatorAnimationOpen?.play(false);
    }
    //Enable ProximityBehaviour if door is set open
    if (this.viewModel.isOpen.Value) {
      this.enableProximityBehaviour = true;
    }
  }

  open(): void {
    this.elevatorAnimationLiftUp?.start(false);
    this.elevatorAnimationLiftUp?.onAnimationEndObservable.add(() => {
      this.elevatorIsLifted = true;
      this.elevatorAnimationLiftUp?.onAnimationEndObservable.clear();
    });
    this.enableProximityBehaviour = true;
  }

  avatarClose(): void {
    if (this.enableProximityBehaviour && !this.elevatorIsLifted) {
      this.elevatorAnimationLiftUp.speedRatio = 1;
      this.elevatorAnimationLiftUp?.play(false);
      console.log("Lift Up Elevator ");
    }
  }

  avatarFar(): void {
    //Play first lift down animation for entry elevator
    if (!this.enableProximityBehaviour && !this.viewModel.isExit) {
      this.elevatorAnimationLiftDown?.play(false);
      this.elevatorAnimationLiftDown.onAnimationEndObservable.add(() => {
        this.enableProximityBehaviour = true;
        this.elevatorAnimationLiftDown.onAnimationEndObservable.clear();
      });
      //Regular proximity Behaviour for Elevator
    } else if (this.enableProximityBehaviour) {
      this.elevatorAnimationLiftUp.speedRatio = -1;
      this.elevatorAnimationLiftUp?.play(false);
      this.elevatorIsLifted = false;
      console.log("Lift Down Elevator ");
    }
  }
}
