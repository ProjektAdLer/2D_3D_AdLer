import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScenePresenter from "../../../Babylon/SceneManagement/IScenePresenter";
import AvatarEditorPreviewCameraViewModel from "./AvatarEditorPreviewCameraViewModel";
import IAvatarEditorPreviewCameraPresenter from "./IAvatarEditorPreviewCameraPresenter";
import { injectable } from "inversify";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import AvatarEditorPreviewSceneDefinition from "../AvatarEditorPreviewSceneDefinition";
import bind from "bind-decorator";

@injectable()
export default class AvatarEditorPreviewCameraPresenter
  implements IAvatarEditorPreviewCameraPresenter
{
  private readonly floatDifference = 0.001;
  private readonly zoomStep = 0.1;
  private readonly rotationStep = 0.1;
  private readonly offset = Math.PI / 2;
  private finalZoom: number;
  private scenePresenter: IScenePresenter;
  private initialZoom: number;

  constructor(private viewModel: AvatarEditorPreviewCameraViewModel) {
    const factory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = factory(AvatarEditorPreviewSceneDefinition);
  }

  @bind
  zoomInOnFace(): void {
    const camera = this.viewModel.camera.Value;

    // reduces avatar alpha rotation from -pi to pi
    let origin = camera.alpha - this.offset;
    let multiplicator = origin / Math.PI; // calculate how many half rotations avatar has done
    const sign = Math.sign(multiplicator); // direction of rotation
    multiplicator = sign * Math.floor(Math.abs(multiplicator)); // calculate rounded down half rotations
    if (Math.abs(multiplicator) % 2 === 1) {
      origin -= sign * Math.PI;
    }
    origin -= multiplicator * Math.PI;
    origin += this.offset;
    camera.alpha = origin;

    this.initialZoom = camera.radius;
    this.scenePresenter.Scene.onBeforeAnimationsObservable.add(this.zoomIn);
  }

  @bind
  zoomOutOnFace(): void {
    this.scenePresenter.Scene.onBeforeAnimationsObservable.removeCallback(
      this.zoomIn,
    );
    this.scenePresenter.Scene.onBeforeAnimationsObservable.removeCallback(
      this.zoomOut,
    );
    const camera = this.viewModel.camera.Value;

    if (Math.abs(camera.radius - this.finalZoom) <= this.floatDifference) {
      this.scenePresenter.Scene.onBeforeAnimationsObservable.add(this.zoomOut);
    }
  }

  @bind
  private zoomIn() {
    const camera = this.viewModel.camera.Value;
    if (
      camera.radius <= 1 + this.floatDifference &&
      Math.abs(camera.alpha - this.offset) <=
        this.zoomStep + this.floatDifference
    ) {
      this.scenePresenter.Scene.onBeforeAnimationsObservable.removeCallback(
        this.zoomIn,
      );
      this.finalZoom = camera.radius;
    }
    camera.radius -= this.zoomStep;
    if (camera.alpha - this.offset >= 0) {
      camera.alpha -= this.rotationStep;
    }
    if (camera.alpha - this.offset < 0) {
      camera.alpha += this.rotationStep;
    }
  }

  @bind
  private zoomOut() {
    const camera = this.viewModel.camera.Value;
    if (camera.radius < this.initialZoom) {
      camera.radius += this.zoomStep;
    } else {
      this.scenePresenter.Scene.onBeforeAnimationsObservable.removeCallback(
        this.zoomOut,
      );
    }
  }
}
