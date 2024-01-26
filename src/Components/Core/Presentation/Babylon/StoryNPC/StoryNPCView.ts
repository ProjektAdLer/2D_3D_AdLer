import StoryNPCViewModel from "./StoryNPCViewModel";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import {
  ActionManager,
  AnimationGroup,
  ExecuteCodeAction,
  Mesh,
  Quaternion,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { config } from "src/config";
import IStoryNPCController from "./IStoryNPCController";
import LearningElementModelLookup from "src/Components/Core/Domain/LearningElementModels/LearningElementModelLookup";
import ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import ICharacterNavigator from "../CharacterNavigator/ICharacterNavigator";

import iconLink from "../../../../../Assets/3dModels/sharedModels/l-icons-story-1.glb";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import LearningSpaceTemplateLookup from "src/Components/Core/Domain/LearningSpaceTemplates/LearningSpaceTemplatesLookup";

export default class StoryNPCView {
  private scenePresenter: IScenePresenter;

  private walkAnimation: AnimationGroup;
  private idleAnimation: AnimationGroup;

  constructor(
    private viewModel: StoryNPCViewModel,
    private controller: IStoryNPCController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.viewModel.isInCutScene.subscribe((b: boolean) => {
      this.cutSceneTrigger(b);
    });
  }

  private cutSceneTrigger(isInCutScene: boolean): void {
    if (!isInCutScene) {
      console.log("set from Callback");
      this.controller.setRandomMovementTarget();
    }
  }

  public async asyncSetupStoryNPC(): Promise<void> {
    await Promise.all([this.loadElementModel(), this.loadIconModel()]);
    this.createParentNode();
    this.setupModel();
    this.setupInteractions();
    this.determineSpawnLocation();
    this.createNPCAnimator();
    this.createNPCNavigator();
    this.setupNPCCleanUp();
  }

  private async loadElementModel(): Promise<void> {
    // TODO: comment in when NPC models are ready
    let modelLink;
    modelLink = LearningElementModelLookup[this.viewModel.modelType];

    const result = await this.scenePresenter.loadGLTFModel(modelLink);

    this.viewModel.modelMeshes = result.meshes as Mesh[];

    result.animationGroups.forEach((animationGroup) => {
      // TODO: change the animation names to actual names
      switch (animationGroup.name) {
        case "anim_idle":
          this.idleAnimation = animationGroup;
          break;
        case "anim_walk":
          this.walkAnimation = animationGroup;
          break;
      }
    });
  }

  private setupModel(): void {
    this.viewModel.modelMeshes[0].position = new Vector3(0, 0.05, 0);
    this.viewModel.modelMeshes[0].scaling = new Vector3(1, 1, -1);

    this.viewModel.modelMeshes.forEach(
      (mesh) => (mesh.rotationQuaternion = null)
    );
    this.viewModel.modelMeshes[0].rotationQuaternion = Quaternion.Zero();
  }

  private async loadIconModel(): Promise<void> {
    this.viewModel.iconMeshes = (await this.scenePresenter.loadModel(
      iconLink
    )) as Mesh[];

    this.viewModel.iconMeshes[0].position.addInPlace(
      new Vector3(0, this.viewModel.iconYOffset, 0)
    );
  }

  private createParentNode(): void {
    this.viewModel.parentNode = new TransformNode(
      "NPCParentNode",
      this.scenePresenter.Scene
    );

    this.viewModel.modelMeshes[0].setParent(this.viewModel.parentNode);
    this.viewModel.iconMeshes[0].setParent(this.viewModel.parentNode);
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
      new ExecuteCodeAction(ActionManager.OnPickTrigger, this.controller.picked)
    );
  }

  private determineSpawnLocation(): void {
    // nearly identical as in AvatarView.ts
    let spawnLocation;
    if (
      this.viewModel.learningSpaceTemplateType ===
      LearningSpaceTemplateType.None
    ) {
      spawnLocation = new Vector3(0, 0, 0);
    } else {
      let spawnPoint = LearningSpaceTemplateLookup.getLearningSpaceTemplate(
        this.viewModel.learningSpaceTemplateType
      ).playerSpawnPoint;
      spawnLocation = new Vector3(
        spawnPoint.position.x,
        0,
        spawnPoint.position.y
      );
    }
    // TODO test for all LearningSpaceTemplates
    spawnLocation = spawnLocation.add(this.viewModel.spawnPositionOffset);
    this.viewModel.parentNode.position = spawnLocation;
  }

  private createNPCAnimator(): void {
    this.viewModel.characterAnimator = CoreDIContainer.get<ICharacterAnimator>(
      PRESENTATION_TYPES.ICharacterAnimator
    );
    this.viewModel.characterAnimator.setup(
      () => this.viewModel.characterNavigator.CharacterVelocity,
      this.idleAnimation,
      this.walkAnimation
    );
  }

  private createNPCNavigator(): void {
    this.viewModel.characterNavigator =
      CoreDIContainer.get<ICharacterNavigator>(
        PRESENTATION_TYPES.ICharacterNavigator
      );
    this.viewModel.characterNavigator.setup(
      this.viewModel.parentNode,
      this.viewModel.modelMeshes[0],
      this.viewModel.characterAnimator,
      config.isDebug
    );
    this.viewModel.characterNavigator.IsReady.then(() => {
      if (this.viewModel.isInCutScene.Value === false) {
        this.controller.setRandomMovementTarget();
      }
    });
  }

  private setupNPCCleanUp(): void {
    // timer needs to be cleared, else StoryNPC won't be cleaned up by
    this.scenePresenter.addDisposeSceneCallback(() => {
      clearTimeout(this.viewModel.idleTimer);
    });
  }
}
