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
  Color3,
  ExecuteCodeAction,
  Mesh,
  Quaternion,
  Tools,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { config } from "src/config";
import IStoryNPCController from "./IStoryNPCController";
import IStoryNPCPresenter from "./IStoryNPCPresenter";
import LearningElementModelLookup from "src/Components/Core/Domain/LearningElementModels/LearningElementModelLookup";
import ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import ICharacterNavigator from "../CharacterNavigator/ICharacterNavigator";
import INavigation from "../Navigation/INavigation";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import bind from "bind-decorator";
import HighlightColors from "../HighlightColors";

import iconLink from "../../../../../Assets/3dModels/sharedModels/3dIcons/l-3dicons-story-speech-bubble-dots.glb";
import AvatarAnimationNames from "src/Components/Core/Domain/AvatarModels/AvatarAnimationNames";
import IAvatarPresenter from "../Avatar/IAvatarPresenter";
import { FocusableTypes } from "../Avatar/AvatarFocusSelection/IAvatarFocusable";

export default class StoryNPCView {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;
  private avatarPresenter: IAvatarPresenter;

  private walkAnimation: AnimationGroup;
  private idleAnimation: AnimationGroup;

  constructor(
    private viewModel: StoryNPCViewModel,
    private controller: IStoryNPCController,
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);

    this.viewModel.state.subscribe(this.onStateChanged);
    this.viewModel.isInteractable.subscribe((newValue) => {
      this.updateHighlight();
      this.toggleIconFloatAnimation(newValue);
    });
  }

  // -- Setup --
  public async asyncSetupStoryNPC(): Promise<void> {
    await Promise.all([this.loadElementModel(), this.loadIconModel()]);
    this.createParentNode();
    this.setSpawnLocation();
    this.setupInteractions();
    this.updateHighlight();
    this.createCharacterAnimator();
    this.createCharacterNavigator();
    this.setupCleanup();
  }

  private async loadElementModel(): Promise<void> {
    const modelLink = LearningElementModelLookup[this.viewModel.modelType];

    const result = await this.scenePresenter.loadGLTFModel(modelLink);
    this.viewModel.modelMeshes = result.meshes as Mesh[];
    this.setupModel();
    // set model name for double click functionality
    this.viewModel.modelMeshes.forEach((model) => {
      if (this.viewModel.storyType === StoryElementType.Outro) {
        model.name = FocusableTypes.outroStory.toString();
      } else model.name = FocusableTypes.introStory.toString();
    });

    this.viewModel.modelMeshes[0].accessibilityTag = {
      description: "storyNPC of type: " + this.viewModel.storyType,
      // @ts-ignore
      eventHandler: {
        click: () => {
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

    result.animationGroups.forEach((animationGroup) => {
      switch (animationGroup.name) {
        case AvatarAnimationNames.npc_idle:
          this.idleAnimation = animationGroup;
          break;
        case AvatarAnimationNames.npc_walk:
          this.walkAnimation = animationGroup;
          break;
      }
    });
  }

  private setupModel(): void {
    this.viewModel.modelMeshes[0].position = new Vector3(0, 0.05, 0);

    this.viewModel.modelRootNode = new TransformNode(
      "NPCRootNode",
      this.scenePresenter.Scene,
    );
    this.viewModel.modelMeshes[0].setParent(this.viewModel.modelRootNode);
  }

  @bind private async loadIconModel(): Promise<void> {
    const loadingResults = await this.scenePresenter.loadGLTFModel(iconLink);
    this.viewModel.iconMeshes = loadingResults.meshes as Mesh[];
    this.viewModel.iconMeshes[0].position.addInPlace(
      new Vector3(0, this.viewModel.iconYOffset, 0),
    );
    this.viewModel.iconMeshes[0].rotation = new Vector3(0, -Math.PI / 4, 0);

    // get floating animation, pause if not interactable from the start

    this.viewModel.iconFloatingAnimation = loadingResults.animationGroups[0];
    if (!this.viewModel.isInteractable.Value)
      this.viewModel.iconFloatingAnimation.pause();
  }

  @bind private toggleIconFloatAnimation(isInteractable: boolean): void {
    if (!this.viewModel.iconFloatingAnimation) return;
    if (isInteractable) this.viewModel.iconFloatingAnimation.restart();
    else this.viewModel.iconFloatingAnimation.pause();
  }

  private createParentNode(): void {
    this.viewModel.parentNode = new TransformNode(
      "NPCParentNode",
      this.scenePresenter.Scene,
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

  private setSpawnLocation(): void {
    let spawnPosition: Vector3;
    let spawnRotation: number;

    if (this.viewModel.state.Value === StoryNPCState.Idle) {
      const isIntro =
        (this.viewModel.storyType & StoryElementType.Intro) ===
        StoryElementType.Intro;

      spawnPosition = isIntro
        ? this.viewModel.introIdlePosition
        : this.viewModel.outroIdlePosition;
      spawnRotation = isIntro
        ? this.viewModel.introIdlePosRotation
        : this.viewModel.outroIdlePosRotation;
    } else {
      spawnPosition = this.viewModel.introCutsceneSpawnPosition;
      spawnRotation = this.viewModel.introCutsceneRotation;
    }

    // apply spawn position and rotation
    this.viewModel.parentNode.position = spawnPosition;
    this.viewModel.modelRootNode.rotationQuaternion = Quaternion.RotationAxis(
      Vector3.Up(),
      Tools.ToRadians(spawnRotation),
    );
  }

  private createCharacterAnimator(): void {
    this.viewModel.characterAnimator = CoreDIContainer.get<ICharacterAnimator>(
      PRESENTATION_TYPES.ICharacterAnimator,
    );
    this.viewModel.characterAnimator.setup(
      () => this.viewModel.characterNavigator.CharacterVelocity,
      this.viewModel.modelRootNode,
      this.idleAnimation,
      this.walkAnimation,
    );
  }

  private createCharacterNavigator(): void {
    this.viewModel.characterNavigator =
      CoreDIContainer.get<ICharacterNavigator>(
        PRESENTATION_TYPES.ICharacterNavigator,
      );
    this.viewModel.characterNavigator.setup(
      this.viewModel.parentNode,
      this.viewModel.characterAnimator,
      config.isDebug,
    );

    if (this.viewModel.state.Value === StoryNPCState.RandomMovement)
      this.viewModel.characterNavigator.IsReady.then(() => {
        this.setRandomMovementTarget();
      });
  }

  private setupCleanup(): void {
    this.scenePresenter.addDisposeSceneCallback(() => {
      clearTimeout(this.viewModel.idleTimer);
      clearTimeout(this.viewModel.cutSceneTimer);
      this.viewModel.state.Value = StoryNPCState.Idle;
    });
  }

  // -- Movement --

  @bind
  private onStateChanged(newState: StoryNPCState): void {
    switch (newState) {
      case StoryNPCState.Idle:
        this.moveToIdlePosition();
        break;
      case StoryNPCState.RandomMovement:
        this.startRandomMovementIdleTimeout();
        break;
      case StoryNPCState.CutScene:
        if (
          this.viewModel.storyType === StoryElementType.IntroOutro &&
          !this.viewModel.parentNode.isEnabled()
        ) {
          this.showNPC();
        }
        this.startCutSceneMovement();
        break;
      case StoryNPCState.ExitRoom:
        this.moveToExit();
        break;
    }
  }

  private async moveToExit(): Promise<void> {
    const exitPosition = this.viewModel.exitDoorEnterablePosition;
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
    this.viewModel.characterNavigator.startMovement(exitPosition, async () => {
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      await this.openExitDoorAndDispose();
    });
  }

  private async openExitDoorAndDispose(): Promise<void> {
    const openDoorAndThen = async (action: () => void) => {
      await this.controller.handleNPCExit(this.viewModel.storyType);
      action();
    };

    switch (this.viewModel.storyType) {
      case StoryElementType.Intro:
        await openDoorAndThen(() => this.viewModel.parentNode.dispose());
        break;

      case StoryElementType.Outro:
        this.viewModel.parentNode.dispose();
        break;

      case StoryElementType.IntroOutro:
        if (!this.viewModel.introWasTriggered) {
          await openDoorAndThen(() => this.hideNPC());
        } else {
          this.viewModel.parentNode.dispose();
        }
        break;
    }
  }

  private hideNPC(): void {
    this.viewModel.parentNode.setEnabled(false);
    if (this.viewModel.characterNavigator) {
      this.viewModel.characterNavigator.stopMovement();
    }
  }

  private showNPC(): void {
    this.viewModel.parentNode.setEnabled(true);
    this.setSpawnLocationForOutro();
  }

  private setSpawnLocationForOutro(): void {
    this.viewModel.parentNode.position = this.viewModel.outroIdlePosition;
    this.viewModel.modelRootNode.rotationQuaternion = Quaternion.RotationAxis(
      Vector3.Up(),
      Tools.ToRadians(this.viewModel.outroIdlePosRotation),
    );
  }

  private moveToIdlePosition(): void {
    const idlePosition =
      this.viewModel.storyType === StoryElementType.Intro
        ? this.viewModel.introIdlePosition
        : this.viewModel.outroIdlePosition;

    this.viewModel.characterNavigator.startMovement(idlePosition, () => {
      // set correct rotation when idle position is reached
      this.viewModel.modelRootNode.rotationQuaternion = Quaternion.RotationAxis(
        Vector3.Up(),
        this.viewModel.storyType === StoryElementType.Intro
          ? Tools.ToRadians(this.viewModel.introIdlePosRotation)
          : Tools.ToRadians(this.viewModel.outroIdlePosRotation),
      );
    });
  }

  private startCutSceneMovement(): void {
    if (!this.avatarPresenter) {
      this.avatarPresenter = CoreDIContainer.get<IAvatarPresenter>(
        PRESENTATION_TYPES.IAvatarPresenter,
      );
    }

    const targetOffset = this.avatarPresenter.AvatarPosition.subtract(
      this.viewModel.parentNode.position,
    )
      .normalize()
      .scale(this.viewModel.cutSceneDistanceFromAvatar);
    const target = this.avatarPresenter.AvatarPosition.subtract(targetOffset);

    this.viewModel.cutSceneTimer = setTimeout(() => {
      this.viewModel.characterNavigator.startMovement(target, () => {
        const sequenceToOpen =
          this.viewModel.storyType === StoryElementType.IntroOutro
            ? this.viewModel.currentlyRunningSequence
            : this.viewModel.storyType;
        this.viewModel.storyElementPresenter.open(sequenceToOpen);
      });
    }, this.viewModel.cutSceneStartDelay);
  }

  @bind
  private setRandomMovementTarget() {
    if (this.viewModel.state.Value !== StoryNPCState.RandomMovement) return;

    let target: Vector3;
    let distance: number = 0;
    do {
      target = this.navigation.Plugin.getRandomPointAround(
        this.viewModel.parentNode.position,
        this.viewModel.movementRange,
      );
      distance = Vector3.Distance(target, this.viewModel.parentNode.position);
    } while (distance < this.viewModel.minMovementDistance);

    this.viewModel.characterNavigator.startMovement(
      target,
      this.startRandomMovementIdleTimeout,
    );
  }

  @bind
  private startRandomMovementIdleTimeout(): void {
    this.viewModel.idleTimer = setTimeout(() => {
      this.setRandomMovementTarget();
    }, this.viewModel.idleTime);
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
    if (this.viewModel.isInteractable.Value)
      this.changeHighlightColor(HighlightColors.NonLearningElementBase);
    else
      this.changeHighlightColor(
        HighlightColors.getNonInteractableColor(
          HighlightColors.NonLearningElementBase,
        ),
      );
  }
}
