import IAvatarCameraController from "./IAvatarCameraController";
import AvatarCameraViewModel from "./AvatarCameraViewModel";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import { ArcRotateCamera, TransformNode } from "@babylonjs/core";
import bind from "bind-decorator";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";

export default class AvatarCameraView {
  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: AvatarCameraViewModel,
    private controller: IAvatarCameraController
  ) {
    let factory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = factory(LearningSpaceSceneDefinition);

    this.viewModel.parentNode.subscribe(this.createCamera);
  }

  @bind
  private createCamera(parentNode: TransformNode): void {
    if (!parentNode) return;

    let camera = new ArcRotateCamera(
      "AvatarCamera",
      this.viewModel.defaultAlphaRotation,
      this.viewModel.defaultBetaRotation,
      this.viewModel.defaultRadius,
      parentNode.position,
      this.scenePresenter.Scene
    );

    // set camera parent
    camera.parent = parentNode;

    // apply camera
    this.viewModel.camera.Value = camera;
    this.scenePresenter.Scene.activeCamera = camera;
  }
}
