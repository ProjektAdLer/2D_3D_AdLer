import { AnimationGroup } from "@babylonjs/core";
import IDoorLogic from "./IDoorLogic";
import DoorViewModel from "../DoorViewModel";

export default class ElevatorLogic implements IDoorLogic {
  private elevatorAnimationOpen: AnimationGroup;
  private elevatorAnimationLiftUp: AnimationGroup;
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
        }
      }
    });
    //Play initial entry elevator animation on scene start
    if (!this.viewModel.isExit) {
      this.elevatorAnimationOpen?.play(false);
      this.elevatorIsLifted = true;
      this.enableProximityBehaviour = true;
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
    if (this.enableProximityBehaviour) {
      this.elevatorAnimationLiftUp.speedRatio = -1;
      this.elevatorAnimationLiftUp?.play(false);
      this.elevatorIsLifted = false;
      console.log("Lift Down Elevator ");
    }
  }
}
