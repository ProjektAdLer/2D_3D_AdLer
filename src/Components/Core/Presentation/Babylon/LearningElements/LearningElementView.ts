import {
  ActionEvent,
  ActionManager,
  Color3,
  ExecuteCodeAction,
  Mesh,
  Tools,
  Vector3,
} from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import type IScenePresenter from "../SceneManagement/IScenePresenter";
import ILearningElementController from "./ILearningElementController";
import LearningElementViewModel from "./LearningElementViewModel";
import { LearningElementTypes } from "../../../Domain/Types/LearningElementTypes";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import bind from "bind-decorator";
import ArrayItemRandomizer from "../../Utils/ArrayItemRandomizer/ArrayItemRandomizer";

const modelLinks: { [key in LearningElementTypes]?: any[] } = {
  [LearningElementTypes.h5p]: [
    require("../../../../../Assets/3dModels/defaultTheme/l_h5p_deskpc_1.glb"),
    require("../../../../../Assets/3dModels/defaultTheme/l_h5p_slotmachine_1.glb"),
    require("../../../../../Assets/3dModels/defaultTheme/l_h5p_blackboard_1.glb"),
    require("../../../../../Assets/3dModels/defaultTheme/l_h5p_drawingtable_1.glb"),
  ],
  [LearningElementTypes.text]: [
    require("../../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_1.glb"),
    require("../../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_2.glb"),
  ],
  [LearningElementTypes.pdf]: [
    require("../../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_1.glb"),
    require("../../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_2.glb"),
  ],
  [LearningElementTypes.image]: [
    require("../../../../../Assets/3dModels/defaultTheme/l_picture_painting_1.glb"),
    require("../../../../../Assets/3dModels/defaultTheme/l_picture_painting_2.glb"),
    require("../../../../../Assets/3dModels/defaultTheme/l_picture_paintingeasel_1.glb"),
  ],
  [LearningElementTypes.video]: [
    require("../../../../../Assets/3dModels/defaultTheme/l_video_television_1.glb"),
  ],
  [LearningElementTypes.notAnElement]: [],
};

const iconLinks: { [key in LearningElementTypes]?: any } = {
  [LearningElementTypes.h5p]: require("../../../../../Assets/3dModels/defaultTheme/l-icons-h5p-1.glb"),
  [LearningElementTypes.text]: require("../../../../../Assets/3dModels/defaultTheme/l-icons-text-1.glb"),
  [LearningElementTypes.pdf]: require("../../../../../Assets/3dModels/defaultTheme/l-icons-text-1.glb"),
  [LearningElementTypes.image]: require("../../../../../Assets/3dModels/defaultTheme/l-icons-image-1.glb"),
  [LearningElementTypes.video]: require("../../../../../Assets/3dModels/defaultTheme/l-icons-video-1.glb"),
  [LearningElementTypes.notAnElement]: [],
};

export default class LearningElementView {
  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: LearningElementViewModel,
    private controller: ILearningElementController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    // setup callbacks for rerendering when the view model changes
    viewModel.position.subscribe(this.positionModel);
    viewModel.rotation.subscribe(this.positionModel);
    viewModel.hasScored.subscribe(() => {
      this.changeHighlightColor(
        this.viewModel.hasScored.Value ? Color3.Green() : Color3.Red()
      );
    });
  }

  public async setupLearningElement(): Promise<void> {
    const modelRandomizer = new ArrayItemRandomizer(
      modelLinks[this.viewModel.type.Value as LearningElementTypes]!
    );

    // load meshes
    this.viewModel.modelMeshes.Value = (await this.scenePresenter.loadModel(
      modelRandomizer.getItem(this.viewModel.name.Value),
      true
    )) as Mesh[];
    this.viewModel.iconMeshes.Value = (await this.scenePresenter.loadModel(
      iconLinks[this.viewModel.type.Value as LearningElementTypes]!
    )) as Mesh[];

    // create action manager for each mesh
    const actionManager = new ActionManager(this.scenePresenter.Scene);
    this.viewModel.modelMeshes.Value.forEach((mesh) => {
      mesh.actionManager = actionManager;
    });
    this.viewModel.iconMeshes.Value.forEach((mesh) => {
      mesh.actionManager = actionManager;
    });

    // register interaction callbacks
    this.registerActionWithAllMeshes(
      ActionManager.OnPickTrigger,
      this.controller.clicked
    );
    this.registerActionWithAllMeshes(
      ActionManager.OnPointerOverTrigger,
      this.controller.pointerOver
    );
    this.registerActionWithAllMeshes(
      ActionManager.OnPointerOutTrigger,
      this.controller.pointerOut
    );

    // add model meshes to highlight layer
    this.viewModel.modelMeshes.Value.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.addMesh(
        mesh,
        this.viewModel.hasScored.Value ? Color3.Green() : Color3.Red()
      );
    });
    this.viewModel.iconMeshes.Value.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.addMesh(
        mesh,
        this.viewModel.hasScored.Value ? Color3.Green() : Color3.Red()
      );
    });

    this.positionModel();
  }

  private registerActionWithAllMeshes(
    triggerOptions: any,
    callback: (event?: ActionEvent) => void
  ): void {
    this.viewModel.modelMeshes.Value.forEach((mesh) => {
      mesh.actionManager?.registerAction(
        new ExecuteCodeAction(triggerOptions, callback)
      );
    });
    this.viewModel.iconMeshes.Value.forEach((mesh) => {
      mesh.actionManager?.registerAction(
        new ExecuteCodeAction(triggerOptions, callback)
      );
    });
  }

  @bind
  private positionModel(): void {
    if (this.viewModel.modelMeshes.Value && this.viewModel.iconMeshes.Value) {
      this.viewModel.modelMeshes.Value[0].position =
        this.viewModel.position.Value;
      this.viewModel.iconMeshes.Value[0].position =
        this.viewModel.position.Value.add(
          new Vector3(0, this.viewModel.iconYOffset, 0)
        );

      this.viewModel.modelMeshes.Value[0].rotate(
        Vector3.Up(),
        Tools.ToRadians(this.viewModel.rotation.Value)
      );
      this.viewModel.iconMeshes.Value[0].rotate(
        Vector3.Up(),
        Tools.ToRadians(this.viewModel.rotation.Value)
      );
    }
  }

  @bind
  private changeHighlightColor(color: Color3): void {
    this.viewModel.modelMeshes.Value?.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.removeMesh(mesh);
      this.scenePresenter.HighlightLayer.addMesh(mesh, color);
    });
    this.viewModel.iconMeshes.Value?.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.removeMesh(mesh);
      this.scenePresenter.HighlightLayer.addMesh(mesh, color);
    });
  }
}
