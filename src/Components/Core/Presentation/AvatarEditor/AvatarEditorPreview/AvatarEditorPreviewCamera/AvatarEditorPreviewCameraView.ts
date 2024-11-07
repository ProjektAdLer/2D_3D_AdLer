import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import IScenePresenter from "../../../Babylon/SceneManagement/IScenePresenter";
import AvatarEditorPreviewSceneDefinition from "../AvatarEditorPreviewSceneDefinition";
import AvatarEditorPreviewCameraViewModel from "./AvatarEditorPreviewCameraViewModel";
import { ArcRotateCamera, Vector3 } from "@babylonjs/core";
import bind from "bind-decorator";

export default class AvatarEditorPreviewCameraView {
  private scenePresenter: IScenePresenter;

  constructor(private viewModel: AvatarEditorPreviewCameraViewModel) {
    let factory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = factory(AvatarEditorPreviewSceneDefinition);

    this.createCamera();
    this.scenePresenter.Scene.onBeforeRenderObservable.add(
      this.updateCameraTarget,
    );
  }

  private createCamera(): void {
    const camera = new ArcRotateCamera(
      "camera",
      this.viewModel.defaultAlphaRotation,
      this.viewModel.defaultBetaRotation,
      this.viewModel.upperRadiusLimit,
      this.viewModel.zoomedOutTarget,
      this.scenePresenter.Scene,
    );
    camera.minZ = this.viewModel.nearClippingPlane;
    this.viewModel.camera.Value = camera;
  }

  @bind
  private updateCameraTarget(): void {
    const camera = this.viewModel.camera.Value;
    const amount =
      (camera.radius - camera.lowerRadiusLimit!) /
      (camera.upperRadiusLimit! - camera.lowerRadiusLimit!);
    camera.target = Vector3.Lerp(
      this.viewModel.zoomedInTarget,
      this.viewModel.zoomedOutTarget,
      amount,
    );
  }
}
