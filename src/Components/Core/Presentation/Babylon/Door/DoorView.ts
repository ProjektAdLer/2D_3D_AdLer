import { Animation, Mesh, SceneLoader, Tools, Vector3 } from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import SceneController from "../SceneManagment/SceneController";
import DoorViewModel from "./DoorViewModel";

const modelLink = require("../../../../../Assets/Door.glb");

export default class DoorView {
  private sceneController: SceneController;

  constructor(private viewModel: DoorViewModel) {
    this.sceneController = CoreDIContainer.get<SceneController>(
      CORE_TYPES.ISceneController
    );

    // setup callbacks for rerendering when the view model changes
    viewModel.position.subscribe(() => {
      this.positionMesh();
    });
    viewModel.rotation.subscribe(() => {
      this.positionMesh();
    });
    viewModel.isVisible.subscribe(() => {
      this.viewModel.meshes.Value.forEach(
        (mesh) => (mesh.isVisible = this.viewModel.isVisible.Value)
      );
    });
    viewModel.isOpen.subscribe(() => {
      if (this.viewModel.isOpen.Value) {
        this.sceneController.Scene.beginAnimation(
          viewModel.meshes.Value[0],
          0,
          45
        );
      }
    });

    // initial setup
    this.setup();
  }

  private async setup(): Promise<void> {
    await this.loadMeshAsync();
    this.setupAnimation();
    this.positionMesh();
  }

  private setupAnimation(): void {
    let animation = new Animation(
      "doorAnimation",
      "rotation",
      30,
      Animation.ANIMATIONTYPE_FLOAT
    );
    animation.setKeys([
      { frame: 0, value: this.viewModel.rotation.Value },
      { frame: 45, value: this.viewModel.rotation.Value + 80 },
    ]);
    this.viewModel.meshes.Value[0].animations.push(animation);
  }

  private async loadMeshAsync(): Promise<void> {
    const result = await SceneLoader.ImportMeshAsync(
      "",
      modelLink,
      "",
      this.sceneController.Scene
    );
    result.meshes.forEach(
      (mesh) => (mesh.isVisible = this.viewModel.isVisible.Value)
    );
    this.viewModel.meshes.Value = result.meshes as Mesh[];
  }

  private positionMesh(): void {
    if (this.viewModel.meshes.Value && this.viewModel.meshes.Value.length > 0) {
      this.viewModel.meshes.Value[0].position = this.viewModel.position.Value;
      this.viewModel.meshes.Value[0].rotate(
        Vector3.Up(),
        Tools.ToRadians(this.viewModel.rotation.Value)
      );
    }
  }
}
