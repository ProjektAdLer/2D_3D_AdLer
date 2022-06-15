import { Animation, Mesh, SceneLoader, Tools, Vector3 } from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IscenePresenter from "../SceneManagement/ScenePresenter";
import DoorViewModel from "./DoorViewModel";

const modelLink = require("../../../../../Assets/3DModel_Door.glb");

export default class DoorView {
  private scenePresenter: IscenePresenter;

  constructor(private viewModel: DoorViewModel) {
    this.scenePresenter = CoreDIContainer.get<IscenePresenter>(
      CORE_TYPES.IScenePresenter
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
        this.scenePresenter.Scene.beginAnimation(
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
    this.positionMesh();
    this.setupAnimation();
  }

  private setupAnimation(): void {
    let animation = new Animation(
      "doorAnimation",
      "rotation.y",
      30,
      Animation.ANIMATIONTYPE_FLOAT
    );
    animation.setKeys([
      { frame: 0, value: Tools.ToRadians(this.viewModel.rotation.Value) },
      {
        frame: 45,
        value: Tools.ToRadians(this.viewModel.rotation.Value - 80),
      },
    ]);
    this.viewModel.meshes.Value[0].animations.push(animation);
  }

  private async loadMeshAsync(): Promise<void> {
    const result = await SceneLoader.ImportMeshAsync(
      "",
      modelLink,
      "",
      this.scenePresenter.Scene
    );

    result.meshes.forEach(
      (mesh) => (mesh.isVisible = this.viewModel.isVisible.Value)
    );
    // reset quaternion rotation because it can prevent mesh.rotate to have any effect
    result.meshes.forEach((mesh) => (mesh.rotationQuaternion = null));

    this.viewModel.meshes.Value = result.meshes as Mesh[];
  }

  private positionMesh(): void {
    if (this.viewModel.meshes.Value && this.viewModel.meshes.Value.length > 0) {
      this.viewModel.meshes.Value[0].position = this.viewModel.position.Value;
      this.viewModel.meshes.Value[0].rotation = new Vector3(
        0.0,
        Tools.ToRadians(this.viewModel.rotation.Value),
        0.0
      );
    }
  }
}
