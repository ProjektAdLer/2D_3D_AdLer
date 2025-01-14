import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import { Mesh, TransformNode } from "@babylonjs/core";
import IScenePresenter from "../../../Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import AvatarEditorPreviewSceneDefinition from "../AvatarEditorPreviewSceneDefinition";
import { AvatarNoneModel } from "src/Components/Core/Domain/AvatarModels/AvatarModelTypes";

const baseModelLink = require("../../../../../../Assets/3dModels/sharedModels/avatar/a-avatar-skeleton.glb");

export default class AvatarEditorPreviewModelView {
  private scenePresenter: IScenePresenter;

  constructor(private viewModel: AvatarEditorPreviewModelViewModel) {
    this.scenePresenter = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    )(AvatarEditorPreviewSceneDefinition);

    viewModel.avatarConfigDiff.subscribe(() => {
      this.onAvatarConfigChanged();
    });
  }

  async asyncSetup(): Promise<void> {
    // load base model and position it
    const result = await this.scenePresenter.loadGLTFModel(baseModelLink);
    this.viewModel.baseModelMeshes = result.meshes as Mesh[];
    this.viewModel.baseModelMeshes[0].position.y = -1;

    // find anchor nodes
    this.viewModel.hairAnchorNode = result.transformNodes.find(
      (node) => node.name === "anker_hair",
    )!;
    this.viewModel.beardAnchorNode = result.transformNodes.find(
      (node) => node.name === "anker_beard",
    )!;
  }

  private onAvatarConfigChanged(): void {
    if (this.viewModel.avatarConfigDiff.Value.beard)
      this.updateModel(
        this.viewModel.avatarConfigDiff.Value.beard,
        "beards",
        this.viewModel.beardMeshes,
        this.viewModel.beardAnchorNode,
      );
    if (this.viewModel.avatarConfigDiff.Value.hair)
      this.updateModel(
        this.viewModel.avatarConfigDiff.Value.hair,
        "hair",
        this.viewModel.hairMeshes,
        this.viewModel.hairAnchorNode,
      );
  }

  private async updateModel<T>(
    newModel: T,
    modelFolder: string,
    modelMap: Map<T, Mesh[]>,
    anchorNode: TransformNode,
  ): Promise<void> {
    // hide all meshes and return if no model is selected
    if (newModel === AvatarNoneModel.None) {
      modelMap.forEach((meshes) => {
        meshes.forEach((mesh) => (mesh.isVisible = false));
      });
      return;
    }

    // load model if not already loaded
    if (!modelMap.has(newModel)) {
      const result = await this.scenePresenter.loadGLTFModel(
        require(
          `../../../../../../Assets/3dModels/sharedModels/avatar/${modelFolder}/aa-${newModel}.glb`,
        ),
      );
      modelMap.set(newModel, result.meshes as Mesh[]);
      result.meshes[0].parent = anchorNode;
    }

    // set all meshes to invisible except the new model
    modelMap.forEach((meshes, type) => {
      const newIsVisible = type === newModel;
      meshes.forEach((mesh) => (mesh.isVisible = newIsVisible));
    });
  }
}
