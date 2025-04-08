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
    this.viewModel.camera.Value.radius = this.viewModel.lowerRadiusLimit;
  }

  onStoryElementCutSceneFinished(): void {
    // resets camera to default settings
    this.viewModel.camera.Value.radius = this.viewModel.defaultRadius;
    this.viewModel.camera.Value.attachControl();
  }
}
