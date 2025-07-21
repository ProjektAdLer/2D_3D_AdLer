import { Vector3, Matrix, Quaternion, Tools } from "@babylonjs/core";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default class DoorPresenter implements IDoorPresenter {
  constructor(private viewModel: DoorViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel was passed as undefined");
    }
  }

  getFocusableCenterPosition(): Vector3 {
    return this.viewModel.position;
  }

  onFocused(): void {
    this.viewModel.isInteractable.Value = true;
  }

  onUnfocused(): void {
    this.viewModel.isInteractable.Value = false;
  }

  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    if (
      spaceScoreTO.spaceID === this.viewModel.spaceID &&
      this.viewModel.isExit &&
      spaceScoreTO.currentScore >= spaceScoreTO.requiredScore
    ) {
      this.viewModel.isOpen.Value = true;
    }
  }

  onStoryElementCutSceneTriggered(storyType: StoryElementType): void {
    this.viewModel.isInputEnabled.Value = false;
  }

  onStoryElementCutSceneFinished(storyType: StoryElementType): void {
    this.viewModel.isInputEnabled.Value = true;
  }

  isExit(): boolean {
    return this.viewModel.isExit;
  }

  getEnterablePosition(): Vector3 {
    // This vector defines the position relative to the door's origin.
    // The values are chosen to place the NPC centered in front of the door.
    const localOffset = new Vector3(0, 0, 0);

    // Create a transformation matrix from the door's rotation and position
    const transformMatrix = Matrix.Compose(
      Vector3.One(), // scale
      Quaternion.RotationAxis(
        Vector3.Up(),
        Tools.ToRadians(this.viewModel.rotation),
      ), // rotation
      this.viewModel.position, // translation
    );

    // Transform the local offset into world coordinates
    return Vector3.TransformCoordinates(localOffset, transformMatrix);
  }

  open(onAnimationEnd?: () => void): void {
    this.viewModel.doorLogic.open(onAnimationEnd);
  }

  close(): void {
    if (this.viewModel.doorLogic.close) this.viewModel.doorLogic.close();
  }
}
