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
  [LearningElementTypes.h5p]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-h5p-interactive-element.glb"),
  [LearningElementTypes.primitiveH5P]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-h5p-interactive-element.glb"),
  [LearningElementTypes.text]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-text-papyrus.glb"),
  [LearningElementTypes.pdf]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-text-papyrus.glb"),
  [LearningElementTypes.image]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-image-abstract-painting.glb"),
  [LearningElementTypes.video]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-video-tv.glb"),
  //[LearningElementTypes.story]: require("../../../../../Assets/3dModels/sharedModels/l-icons-story-1.glb"),
  [LearningElementTypes.adaptivity]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-adaptivity-kite.glb"),
  [LearningElementTypes.notAnElement]: [],
};

const checkedIconLinks: { [key in LearningElementTypes]?: any } = {
  [LearningElementTypes.h5p]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-h5p-interactive-element-checked.glb"),
  [LearningElementTypes.primitiveH5P]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-h5p-interactive-element-checked.glb"),
  [LearningElementTypes.text]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-text-papyrus-checked.glb"),
  [LearningElementTypes.pdf]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-text-papyrus-checked.glb"),
  //[LearningElementTypes.image]: require("../../../../../Assets/3dModels/sharedModels/l-icons-image-check.glb"),
  [LearningElementTypes.image]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-image-abstract-painting-checked.glb"),
  [LearningElementTypes.video]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-video-tv-checked.glb"),
  [LearningElementTypes.adaptivity]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-icons-adaptivity-kite-checked.glb"),
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
    viewModel.hasScored.subscribe(() => this.loadIconModel());
    viewModel.isHighlighted.subscribe(this.updateHighlight);
    viewModel.isInteractable.subscribe(this.updateHighlight);
  }

  public async setupLearningElement(): Promise<void> {
    await Promise.all([this.loadElementModel(), this.loadIconModel()]);
    this.setupInteractions();
    this.updateHighlight();
  }

  private async loadElementModel(): Promise<void> {
    // get link to model by name if given
    const modelLink = LearningElementModelLookup[this.viewModel.modelType];

    this.viewModel.modelMeshes = (await this.scenePresenter.loadModel(
      modelLink,
      true,
    )) as Mesh[];

    // position and rotate model
    this.viewModel.modelMeshes[0].position = this.viewModel.position;
    this.viewModel.modelMeshes[0].rotate(
      Vector3.Up(),
      Tools.ToRadians(this.viewModel.rotation),
    );
  }

  @bind private async loadIconModel(): Promise<void> {
    // dispose old icon meshes on score change
    if (this.viewModel.iconMeshes && this.viewModel.iconMeshes.length > 0) {
      this.viewModel.iconMeshes.forEach((mesh) => mesh.dispose());
    }

    const modelLink = this.viewModel.hasScored.Value
      ? checkedIconLinks[this.viewModel.type as LearningElementTypes]!
      : iconLinks[this.viewModel.type as LearningElementTypes]!;

    this.viewModel.iconMeshes = (await this.scenePresenter.loadModel(
      modelLink,
    )) as Mesh[];

    // position and rotate icon
    this.viewModel.iconMeshes[0].position = this.viewModel.position.add(
      new Vector3(0, this.viewModel.iconYOffset, 0),
    );
    this.viewModel.iconMeshes[0].rotation = new Vector3(
      0,
      (7 * Math.PI) / 4,
      0,
    );
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

  @bind private updateHighlight(): void {
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
