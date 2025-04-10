import { injectable } from "inversify";
import IAvatarCameraPresenter from "./IAvatarCameraPresenter";
import AvatarCameraViewModel from "./AvatarCameraViewModel";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

@injectable()
export default class AvatarCameraPresenter implements IAvatarCameraPresenter {
  constructor(private viewModel: AvatarCameraViewModel) {}

  onStoryElementCutSceneTriggered(storyType: StoryElementType): void {
    this.viewModel.camera.Value.detachControl();
    // zooms camera in
    this.viewModel.preZoomRadius = this.viewModel.camera.Value.radius;
    this.viewModel.zoomPercentage = 0;
    this.triggerZoomTimer("zoomIn");
  }

  onStoryElementCutSceneFinished(): void {
    // resets camera to pre zoom settings
    this.viewModel.zoomPercentage = 0;
    this.triggerZoomTimer("zoomOut");
    this.viewModel.camera.Value.attachControl();
  }

  private triggerZoomTimer(mode: string): void {
    let zoomRate = 2;
    console.log("zoom:", this.viewModel.zoomPercentage);
    setTimeout(() => {
      this.viewModel.zoomPercentage += zoomRate;
      if (mode === "zoomIn") {
        this.zoomIn(zoomRate);
      }
      if (mode === "zoomOut") {
        this.zoomOut(zoomRate);
      }
      if (this.viewModel.zoomPercentage < 100) {
        this.triggerZoomTimer(mode);
      }
    }, 25);
  }
  private zoomIn(zoomRate: number): void {
    let currentRadius = this.viewModel.camera.Value.radius;
    let adjustment = 0.00015 * zoomRate * this.viewModel.zoomPercentage;
    let limit = this.viewModel.lowerRadiusLimit;
    this.viewModel.camera.Value.radius =
      currentRadius - adjustment * currentRadius * (currentRadius - limit);
  }
  private zoomOut(zoomRate: number): void {
    let currentRadius = this.viewModel.camera.Value.radius;
    let adjustment = 0.00015 * zoomRate * this.viewModel.zoomPercentage;
    let limit = this.viewModel.preZoomRadius;
    this.viewModel.camera.Value.radius =
      currentRadius + adjustment * currentRadius * (limit - currentRadius);
  }
}
