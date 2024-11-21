import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import { Mesh } from "@babylonjs/core";
import IScenePresenter from "../../../Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import AvatarEditorPreviewSceneDefinition from "../AvatarEditorPreviewSceneDefinition";

const modelLink = require("../../../../../../Assets/3dModels/sharedModels/3DModel_Avatar_male.glb");

export default class AvatarEditorPreviewModelView {
  private scenePresenter: IScenePresenter;

  constructor(private viewModel: AvatarEditorPreviewModelViewModel) {
    this.scenePresenter = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    )(AvatarEditorPreviewSceneDefinition);
  }

  async asyncSetup(): Promise<void> {
    const result = await this.scenePresenter.loadGLTFModel(modelLink);
    this.viewModel.baseModelMeshes = result.meshes as Mesh[];

    this.viewModel.baseModelMeshes[0].position.y = -1;
  }
}
