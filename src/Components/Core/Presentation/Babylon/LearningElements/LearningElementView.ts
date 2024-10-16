import {
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
import LearningElementModelLookup from "src/Components/Core/Domain/LearningElementModels/LearningElementModelLookup";
import HighlightColors from "../HighlightColors";

const iconLinks: { [key in LearningElementTypes]?: any } = {
  [LearningElementTypes.h5p]: require("../../../../../Assets/3dModels/sharedModels/l-icons-h5p-1.glb"),
  [LearningElementTypes.primitiveH5P]: require("../../../../../Assets/3dModels/sharedModels/l-icons-h5p-1.glb"),
  [LearningElementTypes.text]: require("../../../../../Assets/3dModels/sharedModels/l-icons-text-1.glb"),
  [LearningElementTypes.pdf]: require("../../../../../Assets/3dModels/sharedModels/l-icons-text-1.glb"),
  [LearningElementTypes.image]: require("../../../../../Assets/3dModels/sharedModels/l-icons-image-1.glb"),
  [LearningElementTypes.video]: require("../../../../../Assets/3dModels/sharedModels/l-icons-video-1.glb"),
  //[LearningElementTypes.story]: require("../../../../../Assets/3dModels/sharedModels/l-icons-story-1.glb"),
  [LearningElementTypes.adaptivity]: require("../../../../../Assets/3dModels/sharedModels/l-icons-adaptivity-1.glb"),
  [LearningElementTypes.notAnElement]: [],
};

export default class LearningElementView {
  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: LearningElementViewModel,
    private controller: ILearningElementController,
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    viewModel.hasScored.subscribe(this.updateHighlight);
    viewModel.isHighlighted.subscribe(this.updateHighlight);
    viewModel.isInteractable.subscribe(this.updateHighlight);
  }

  public async setupLearningElement(): Promise<void> {
    await Promise.all([this.loadElementModel(), this.loadIconModel()]);
    this.setupInteractions();
    this.updateHighlight();
    this.positionModel();
  }

  private async loadElementModel(): Promise<void> {
    let modelLink;

    // get link to model by name if given
    modelLink = LearningElementModelLookup[this.viewModel.modelType];

    this.viewModel.modelMeshes = (await this.scenePresenter.loadModel(
      modelLink,
      true,
    )) as Mesh[];
  }

  private async loadIconModel(): Promise<void> {
    this.viewModel.iconMeshes = (await this.scenePresenter.loadModel(
      iconLinks[this.viewModel.type as LearningElementTypes]!,
    )) as Mesh[];
  }

  private setupInteractions(): void {
    // create one action manager for all meshes
    const actionManager = new ActionManager(this.scenePresenter.Scene);
    this.viewModel.modelMeshes.forEach((mesh) => {
      mesh.actionManager = actionManager;
    });
    this.viewModel.iconMeshes.forEach((mesh) => {
      mesh.actionManager = actionManager;
    });

    // register interaction callbacks
    actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPickTrigger,
        this.controller.picked,
      ),
    );
    actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPointerOverTrigger,
        this.controller.pointerOver,
      ),
    );
    actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPointerOutTrigger,
        this.controller.pointerOut,
      ),
    );
  }

  private positionModel(): void {
    if (this.viewModel.modelMeshes && this.viewModel.iconMeshes) {
      this.viewModel.modelMeshes[0].position = this.viewModel.position;
      this.viewModel.iconMeshes[0].position = this.viewModel.position.add(
        new Vector3(0, this.viewModel.iconYOffset, 0),
      );

      this.viewModel.modelMeshes[0].rotate(
        Vector3.Up(),
        Tools.ToRadians(this.viewModel.rotation),
      );
      this.viewModel.iconMeshes[0].rotation = new Vector3(0, -Math.PI / 4, 0);
    }
  }

  private changeHighlightColor(color: Color3): void {
    this.viewModel.modelMeshes?.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.removeMesh(mesh);
      this.scenePresenter.HighlightLayer.addMesh(mesh, color);
    });
    this.viewModel.iconMeshes?.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.removeMesh(mesh);
      this.scenePresenter.HighlightLayer.addMesh(mesh, color);
    });
  }

  @bind
  private updateHighlight(): void {
    let highlightColor: Color3;

    // set base color
    if (this.viewModel.isHighlighted.Value)
      highlightColor = HighlightColors.LearningElementHighlighted;
    else if (this.viewModel.hasScored.Value)
      highlightColor = HighlightColors.LearningElementSolved;
    else highlightColor = HighlightColors.LearningElementUnsolved;

    if (!this.viewModel.isInteractable.Value)
      highlightColor = HighlightColors.getNonInteractableColor(highlightColor);

    this.changeHighlightColor(highlightColor);
  }
}
