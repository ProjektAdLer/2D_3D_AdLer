import {
  Mesh,
  Quaternion,
  Tools,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import type { AnimationGroup, Nullable, Texture } from "@babylonjs/core";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";
import IMovementIndicator from "../MovementIndicator/IMovementIndicator";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import LearningSpaceTemplateLookup from "src/Components/Core/Domain/LearningSpaceTemplates/LearningSpaceTemplatesLookup";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import { config } from "src/config";
import bind from "bind-decorator";
import ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";
import ICharacterNavigator from "../CharacterNavigator/ICharacterNavigator";

const modelLink = require("../../../../../Assets/3dModels/sharedModels/a_avatar_standardmale.glb");

export default class AvatarView {
  private scenePresenter: IScenePresenter;
  private movementIndicator: IMovementIndicator;
  private walkAnimation: AnimationGroup;
  private idleAnimation: AnimationGroup;
  private interactionAnimation: AnimationGroup;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController,
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.movementIndicator = CoreDIContainer.get<IMovementIndicator>(
      PRESENTATION_TYPES.IMovementIndicator,
    );

    this.viewModel.movementTarget.subscribe(this.onMovementTargetChanged);
  }

  public async asyncSetup(): Promise<void> {
    await this.loadAvatarAsync();
    this.setupBlinkAnimation();
    this.createCharacterAnimator();
    await this.createNPCNavigator();
    this.setupCleanup();
  }

  private async loadAvatarAsync(): Promise<void> {
    this.viewModel.parentNode =
      this.scenePresenter.Scene.getTransformNodeByName("AvatarParentNode")!;

    let result = await this.scenePresenter.loadGLTFModel(modelLink);
    this.viewModel.meshes = result.meshes as Mesh[];

    // create separate root node for model
    // so that it can be rotated without affecting gltf coordinate system conversions in __root__ node created by Babylon
    this.viewModel.modelRootNode = new TransformNode(
      "AvatarModelRootNode",
      this.scenePresenter.Scene,
    );
    this.viewModel.modelRootNode.position = new Vector3(0, 0.05, 0); // place model 0.05 above the ground ~ FK
    this.viewModel.modelRootNode.setParent(this.viewModel.parentNode);
    this.viewModel.meshes[0].setParent(this.viewModel.modelRootNode);

    const [spawnPosition, spawnRotation] = this.determineSpawnLocation();
    this.viewModel.parentNode.position = spawnPosition;
    this.viewModel.modelRootNode.rotationQuaternion = Quaternion.RotationAxis(
      Vector3.Up(),
      Tools.ToRadians(spawnRotation),
    );

    // animation setup
    result.animationGroups.forEach((animationGroup) => {
      switch (animationGroup.name) {
        case "ac_anim_idle":
          this.idleAnimation = animationGroup;
          break;
        case "ac_anim_walkcycle":
          this.walkAnimation = animationGroup;
          break;
        case "ac_anim_interact":
          this.interactionAnimation = animationGroup;
          break;
      }
    });
  }

  @bind
  private setupBlinkAnimation(): void {
    const eyeMaterial = this.viewModel.meshes.find(
      (mesh) => mesh.material?.name === "Eyes_mat",
    )?.material!;
    this.viewModel.eyeTextures = eyeMaterial.getActiveTextures() as Texture[];

    this.setBlinkTimeout();
  }

  @bind
  private setBlinkTimeout(): void {
    this.viewModel.setEyeTimer = setTimeout(
      () => {
        // set eye texture offset to blink texture
        this.viewModel.eyeTextures.forEach((texture) => {
          texture.uOffset = this.viewModel.blinkTextureUOffset;
        });

        // set timeout to reset eye texture offset and restart blink timeout
        this.viewModel.resetEyeTimer = setTimeout(() => {
          this.viewModel.eyeTextures.forEach((texture) => {
            texture.uOffset = 0;
          });
          this.setBlinkTimeout();
        }, this.viewModel.blinkDuration);
      },
      this.viewModel.blinkInterval +
        Math.random() * this.viewModel.blinkIntervalMaxOffset,
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
      this.interactionAnimation,
    );
  }

  private async createNPCNavigator(): Promise<void> {
    this.viewModel.characterNavigator =
      CoreDIContainer.get<ICharacterNavigator>(
        PRESENTATION_TYPES.ICharacterNavigator,
      );
    this.viewModel.characterNavigator.setup(
      this.viewModel.parentNode,
      this.viewModel.characterAnimator,
      config.isDebug,
    );
    await this.viewModel.characterNavigator.IsReady;
  }

  private determineSpawnLocation(): [Vector3, number] {
    let spawnLocation;
    let spawnRotation;
    if (
      this.viewModel.learningSpaceTemplateType ===
      LearningSpaceTemplateType.None
    ) {
      spawnLocation = new Vector3(0, 0, 0);
      spawnRotation = 0;
    } else {
      let spawnPoint = LearningSpaceTemplateLookup.getLearningSpaceTemplate(
        this.viewModel.learningSpaceTemplateType,
      ).playerSpawnPoint;
      spawnLocation = new Vector3(
        spawnPoint.position.x,
        0,
        spawnPoint.position.y,
      );
      spawnRotation = spawnPoint.orientation.rotation;
    }

    return [spawnLocation, spawnRotation];
  }

  @bind
  private onMovementTargetChanged(newTarget: Nullable<Vector3>): void {
    if (newTarget === null) this.movementIndicator.hide();
    else this.movementIndicator.display(newTarget);
  }

  @bind
  private setupCleanup(): void {
    this.scenePresenter.addDisposeSceneCallback(() => {
      clearTimeout(this.viewModel.resetEyeTimer);
      clearTimeout(this.viewModel.setEyeTimer);
    });
  }
}
