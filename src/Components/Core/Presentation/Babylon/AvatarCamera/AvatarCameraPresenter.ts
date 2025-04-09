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
    setTimeout(() => {
      this.viewModel.zoomPercentage += 2;
      if (mode === "zoomIn") {
        this.zoomIn();
      }
      if (mode === "zoomOut") {
        this.zoomOut();
      }
      if (this.viewModel.zoomPercentage < 100) {
        this.triggerZoomTimer(mode);
      }
    }, 25);
  }
  private zoomIn(): void {
    let a = this.viewModel.preZoomRadius;
    let b = this.viewModel.lowerRadiusLimit;
    let c = this.viewModel.zoomPercentage;
    let d = a - b;
    let e = d * (c / 100);
    let f = a - e;
    this.viewModel.camera.Value.radius = f;
  }
  private zoomOut(): void {
    let a = this.viewModel.lowerRadiusLimit;
    let b = this.viewModel.preZoomRadius;
    let c = this.viewModel.zoomPercentage;
    let d = b - a;
    let e = d * (c / 100);
    let f = a + e;
    this.viewModel.camera.Value.radius = f;
  }
}
