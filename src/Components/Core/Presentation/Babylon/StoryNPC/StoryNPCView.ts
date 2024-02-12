import StoryNPCViewModel, { StoryNPCState } from "./StoryNPCViewModel";
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
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { config } from "src/config";
import IStoryNPCController from "./IStoryNPCController";
import LearningElementModelLookup from "src/Components/Core/Domain/LearningElementModels/LearningElementModelLookup";
import ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import ICharacterNavigator from "../CharacterNavigator/ICharacterNavigator";
import INavigation from "../Navigation/INavigation";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import bind from "bind-decorator";

import iconLink from "../../../../../Assets/3dModels/sharedModels/l-icons-story-1.glb";

export default class StoryNPCView {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;

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
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);

    this.viewModel.state.subscribe(this.onStateChanged);
  }

  // -- Setup --
  public async asyncSetupStoryNPC(): Promise<void> {
    await Promise.all([this.loadElementModel(), this.loadIconModel()]);
    this.createParentNode();
    this.setSpawnLocation();
    this.setupInteractions();
    this.createCharacterAnimator();
    this.createCharacterNavigator();
    this.setupCleanup();
  }

  private async loadElementModel(): Promise<void> {
    const modelLink = LearningElementModelLookup[this.viewModel.modelType];

    const result = await this.scenePresenter.loadGLTFModel(modelLink);
    this.viewModel.modelMeshes = result.meshes as Mesh[];
    this.setupModel();

    result.animationGroups.forEach((animationGroup) => {
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

    // create separate root node for model
    // so that it can be rotated without affecting gltf coordinate system conversions in __root__ node created by Babylon
    this.viewModel.modelRootNode = new TransformNode(
      "NPCRootNode",
      this.scenePresenter.Scene
    );
    this.viewModel.modelMeshes[0].setParent(this.viewModel.modelRootNode);
  }

  private async loadIconModel(): Promise<void> {
    this.viewModel.iconMeshes = (await this.scenePresenter.loadModel(
      iconLink
    )) as Mesh[];
    this.viewModel.iconMeshes[0].position.addInPlace(
      new Vector3(0, this.viewModel.iconYOffset, 0)
    );
    this.viewModel.iconMeshes[0].rotation = new Vector3(0, -Math.PI / 4, 0);
  }

  private createParentNode(): void {
    this.viewModel.parentNode = new TransformNode(
      "NPCParentNode",
      this.scenePresenter.Scene
    );
    this.viewModel.modelRootNode.setParent(this.viewModel.parentNode);
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

  private async setSpawnLocation(): Promise<void> {
    // get spawn location depending on story type
    let spawnLocation: Vector3 =
      (this.viewModel.storyType ?? StoryElementType.Intro) ===
      StoryElementType.Intro
        ? this.getIntroSpawnLocation()
        : this.viewModel.outroIdlePosition;

    // snap spawn to navmesh
    await this.navigation.IsReady;
    spawnLocation = this.navigation.Plugin.getClosestPoint(spawnLocation);

    // apply spawn location
    this.viewModel.parentNode.position = spawnLocation;
  }

  private getIntroSpawnLocation(): Vector3 {
    const spawnLocation = this.viewModel.avatarPosition.add(
      this.viewModel.introSpawnPositionOffsetFromAvatar
    );
    return spawnLocation;
  }

  private createCharacterAnimator(): void {
    this.viewModel.characterAnimator = CoreDIContainer.get<ICharacterAnimator>(
      PRESENTATION_TYPES.ICharacterAnimator
    );
    this.viewModel.characterAnimator.setup(
      () => this.viewModel.characterNavigator.CharacterVelocity,
      this.viewModel.modelRootNode,
      this.idleAnimation,
      this.walkAnimation
    );
  }

  private createCharacterNavigator(): void {
    this.viewModel.characterNavigator =
      CoreDIContainer.get<ICharacterNavigator>(
        PRESENTATION_TYPES.ICharacterNavigator
      );
    this.viewModel.characterNavigator.setup(
      this.viewModel.parentNode,
      this.viewModel.characterAnimator,
      config.isDebug
    );

    if (this.viewModel.state.Value === StoryNPCState.RandomMovement)
      this.viewModel.characterNavigator.IsReady.then(() => {
        this.setRandomMovementTarget();
      });
  }

  private setupCleanup(): void {
    // timer needs to be cleared, else StoryNPC won't be cleaned up by garbage collection
    this.scenePresenter.addDisposeSceneCallback(() => {
      clearTimeout(this.viewModel.idleTimer);
    });
  }

  // -- Movement --

  @bind
  onStateChanged(newState: StoryNPCState): void {
    switch (newState) {
      case StoryNPCState.Idle:
        this.moveToIdlePosition();
        break;
      case StoryNPCState.RandomMovement:
        this.setRandomMovementTarget();
        break;
      case StoryNPCState.CutScene:
        this.startCutSceneMovement();
        break;
    }
  }

  moveToIdlePosition(): void {
    const idlePosition =
      this.viewModel.storyType === StoryElementType.Intro
        ? this.viewModel.introIdlePosition
        : this.viewModel.outroIdlePosition;

    this.viewModel.characterNavigator.startMovement(idlePosition, () => {
      // TODO: set correct rotation when idle position is reached
      console.log("Idle position reached");
    });
  }

  startCutSceneMovement(): void {
    // npc stops in specific distance from avatar
    const targetOffset = this.viewModel.avatarPosition
      .subtract(this.viewModel.parentNode.position)
      .normalize()
      .scale(this.viewModel.cutSceneDistanceFromAvatar);
    const target = this.viewModel.avatarPosition.subtract(targetOffset);

    // go to avatar
    setTimeout(() => {
      this.viewModel.characterNavigator.startMovement(target, () => {
        this.viewModel.storyElementPresenter.open(this.viewModel.storyType);
      });
    }, this.viewModel.cutSceneStartDelay);
  }

  @bind
  setRandomMovementTarget() {
    let target: Vector3;
    let distance: number = 0;
    do {
      target = this.navigation.Plugin.getRandomPointAround(
        this.viewModel.parentNode.position,
        this.viewModel.movementRange
      );
      distance = Vector3.Distance(target, this.viewModel.parentNode.position);
    } while (distance < this.viewModel.minMovementDistance);

    this.viewModel.characterNavigator.startMovement(
      target,
      this.startIdleTimeout
    );
  }

  @bind
  private startIdleTimeout(): void {
    this.viewModel.idleTimer = setTimeout(() => {
      // prevent movement when in invalid state
      if (this.viewModel.state.Value === StoryNPCState.RandomMovement)
        this.setRandomMovementTarget();
    }, this.viewModel.idleTime);
  }
}
