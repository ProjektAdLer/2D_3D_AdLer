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
import LearningElementModelLookup from "src/Components/Core/Domain/LearningElementModels/LearningElementModelLookup";
import HighlightColors from "../HighlightColors";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

const iconLinks: { [key in LearningElementTypes]?: any } = {
  [LearningElementTypes.h5p]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-h5p-interactive-element.glb"),
  [LearningElementTypes.primitiveH5P]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-h5p-interactive-element.glb"),
  [LearningElementTypes.text]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-text-papyrus.glb"),
  [LearningElementTypes.pdf]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-text-papyrus.glb"),
  [LearningElementTypes.image]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-image-abstract-painting.glb"),
  [LearningElementTypes.video]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-video-tv.glb"),
  [LearningElementTypes.adaptivity]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-adaptivity-kite.glb"),
  [LearningElementTypes.notAnElement]: [],
};

const checkedIconLinks: { [key in LearningElementTypes]?: any } = {
  [LearningElementTypes.h5p]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-h5p-interactive-element-checked.glb"),
  [LearningElementTypes.primitiveH5P]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-h5p-interactive-element-checked.glb"),
  [LearningElementTypes.text]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-text-papyrus-checked.glb"),
  [LearningElementTypes.pdf]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-text-papyrus-checked.glb"),
  //[LearningElementTypes.image]: require("../../../../../Assets/3dModels/sharedModels/l-icons-image-check.glb"),
  [LearningElementTypes.image]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-image-abstract-painting-checked.glb"),
  [LearningElementTypes.video]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-video-tv-checked.glb"),
  [LearningElementTypes.adaptivity]: require("../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-adaptivity-kite-checked.glb"),
  [LearningElementTypes.notAnElement]: [],
};

export default class LearningElementView {
  private scenePresenter: IScenePresenter;
  private logger: ILoggerPort;

  constructor(
    private viewModel: LearningElementViewModel,
    private controller: ILearningElementController,
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

    viewModel.hasScored.subscribe(() => {
      this.updateHighlight();
      this.loadIconModel();
    });
    viewModel.isHighlighted.subscribe((newValue) => {
      this.updateHighlight();
      this.toggleIconFloatAnimation(newValue);
    });
    viewModel.isInteractable.subscribe((newValue) => {
      this.updateHighlight();
      this.toggleIconFloatAnimation(newValue);
    });
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

    this.viewModel.modelMeshes[0].accessibilityTag = {
      description: this.viewModel.name + " " + this.viewModel.id,
      // @ts-ignore
      eventHandler: {
        click: () => {
          // this.viewModel.isInteractable.Value = true;
          this.controller.accessibilityPicked();

          // get position on screen
          const canvas =
            this.scenePresenter.Scene.getEngine().getRenderingCanvas();
          const position =
            this.viewModel.modelMeshes[0].getPositionInCameraSpace(
              this.scenePresenter.Scene.activeCamera!,
            );

          // simulate click on that position
          const event = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: position.x,
            clientY: position.y,
          });
          canvas!.dispatchEvent(event);
        },
      },
    };

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
      this.viewModel.iconFloatingAnimation?.dispose();
    }

    // load model
    const modelLink = this.viewModel.hasScored.Value
      ? checkedIconLinks[this.viewModel.type as LearningElementTypes]!
      : iconLinks[this.viewModel.type as LearningElementTypes]!;
    const loadingResults = await this.scenePresenter.loadGLTFModel(modelLink);

    // get meshes, position and rotate icon
    this.viewModel.iconMeshes = loadingResults.meshes as Mesh[];
    this.viewModel.iconMeshes[0].position = this.viewModel.position.add(
      new Vector3(0, this.viewModel.iconYOffset, 0),
    );
    this.viewModel.iconMeshes[0].rotation = new Vector3(
      0,
      (7 * Math.PI) / 4,
      0,
    );

    // get floating animation, pause if not interactable from the start
    if (
      loadingResults.animationGroups.length > 1 ||
      loadingResults.animationGroups.length === 0
    ) {
      this.logger.log(
        LogLevelTypes.WARN,
        "Expected exactly one animation group for icon model, but got " +
          loadingResults.animationGroups.length +
          " instead. Using first animation group.",
      );
    }
    this.viewModel.iconFloatingAnimation = loadingResults.animationGroups[0];
    if (!this.viewModel.isInteractable.Value)
      this.viewModel.iconFloatingAnimation.pause();
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
      new ExecuteCodeAction(ActionManager.OnPickTrigger, (e) =>
        this.controller.picked(),
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

  @bind private toggleIconFloatAnimation(isInteractable: boolean): void {
    if (!this.viewModel.iconFloatingAnimation) return;
    if (isInteractable) this.viewModel.iconFloatingAnimation.restart();
    else this.viewModel.iconFloatingAnimation.pause();
  }
}
