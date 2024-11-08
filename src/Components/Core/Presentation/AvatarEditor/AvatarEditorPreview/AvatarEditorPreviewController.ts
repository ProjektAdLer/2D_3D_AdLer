import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import { ArcRotateCamera, Nullable, Observer, Scene } from "@babylonjs/core";
import IAvatarEditorPreviewController from "./IAvatarEditorPreviewController";
import AvatarEditorPreviewViewModel from "./AvatarEditorPreviewViewModel";
import bind from "bind-decorator";
import AvatarEditorPreviewSceneDefinition from "./AvatarEditorPreviewSceneDefinition";
import IScenePresenter from "../../Babylon/SceneManagement/IScenePresenter";

export default class AvatarEditorPreviewController
  implements IAvatarEditorPreviewController
{
  private scenePresenter: IScenePresenter;
  private camera: ArcRotateCamera | null = null;
  private sceneObserver: Nullable<Observer<Scene>>;

  constructor(private viewModel: AvatarEditorPreviewViewModel) {
    const factory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = factory(AvatarEditorPreviewSceneDefinition);
  }

  @bind
  onTurnLeftDown() {
    this.sceneObserver =
      this.scenePresenter.Scene.onBeforeAnimationsObservable.add(() => {
        this.getCamera().alpha += this.viewModel.alphaStep;
      });
  }

  @bind
  onTurnLeftUp(): void {
    this.removeSceneObserver();
  }

  @bind
  onTurnRightDown() {
    this.sceneObserver =
      this.scenePresenter.Scene.onBeforeAnimationsObservable.add(() => {
        this.getCamera().alpha -= this.viewModel.alphaStep;
      });
  }

  @bind
  onTurnRightUp(): void {
    this.removeSceneObserver();
  }

  @bind
  onZoomInDown() {
    this.sceneObserver =
      this.scenePresenter.Scene.onBeforeAnimationsObservable.add(() => {
        this.getCamera().radius -= this.viewModel.zoomStep;
      });
  }

  @bind
  onZoomInUp(): void {
    this.removeSceneObserver();
  }

  @bind
  onZoomOutDown() {
    this.sceneObserver =
      this.scenePresenter.Scene.onBeforeAnimationsObservable.add(() => {
        this.getCamera().radius += this.viewModel.zoomStep;
      });
  }

  @bind
  onZoomOutUp(): void {
    this.removeSceneObserver();
  }

  private getCamera(): ArcRotateCamera {
    // get camera on demand to avoid race conditions
    if (!this.camera)
      this.camera = this.scenePresenter.Scene.activeCamera as ArcRotateCamera;
    return this.camera;
  }

  private removeSceneObserver() {
    if (this.sceneObserver)
      this.scenePresenter.Scene.onBeforeAnimationsObservable.remove(
        this.sceneObserver,
      );
  }
}
