import {
  Mesh,
  Quaternion,
  Tools,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import type {
  AnimationGroup,
  ISceneLoaderAsyncResult,
  Nullable,
  Texture,
} from "@babylonjs/core";
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
import IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import AvatarEditorUtils from "../../AvatarEditor/AvatarEditorUtils";
import AvatarModelAssetPaths from "src/Components/Core/Domain/AvatarModels/AvatarModelPaths";
import AvatarModelTransforms from "src/Components/Core/Domain/AvatarModels/AvatarModelTransforms";
import {
  AvatarEyeBrowTexture,
  AvatarEyeTexture,
  AvatarMouthTexture,
  AvatarNoseTexture,
} from "src/Components/Core/Domain/AvatarModels/AvatarFaceUVTexture";
import AvatarModelMaterialNames from "src/Components/Core/Domain/AvatarModels/AvatarModelMaterialNames";
import AvatarAnimationNames from "src/Components/Core/Domain/AvatarModels/AvatarAnimationNames";

const modelLink = require("../../../../../Assets/3dModels/sharedModels/avatar/a-avatar-skeleton.glb");

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

    const result = await this.scenePresenter.loadGLTFModel(modelLink);

    // Default-Meshes ausblenden
    [
      "defaultPants_primitive0",
      "defaultPants_primitive1",
      "defaultShoes_primitive0",
      "defaultShoes_primitive1",
      "defaultTop",
    ].forEach((meshName) => {
      const meshToHide = result.meshes.find((m) => m.name === meshName);
      if (meshToHide) {
        meshToHide.dispose();
      }
    });

    this.viewModel.meshes = result.meshes as Mesh[];

    await this.loadCustomizedAvatarAssets(result);

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
        case AvatarAnimationNames.idle:
          this.idleAnimation = animationGroup;
          break;
        case AvatarAnimationNames.walk:
          this.walkAnimation = animationGroup;
          break;
        case AvatarAnimationNames.interact:
          this.interactionAnimation = animationGroup;
          break;
      }
    });
  }

  @bind
  private setupBlinkAnimation(): void {
    const eyeMaterial = this.viewModel.meshes.find((mesh) =>
      mesh.material?.name.includes(AvatarModelMaterialNames.eyes),
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

  private async loadCustomizedAvatarAssets(
    result: ISceneLoaderAsyncResult,
  ): Promise<void> {
    const entityContainer = CoreDIContainer.get<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    );
    const avatarEntity =
      entityContainer.getEntitiesOfType(UserDataEntity)[0].avatar;
    const anchorNodes = AvatarEditorUtils.getAvatarAnchorNodes(
      result.transformNodes,
    );
    const baseSkeleton = result.skeletons[0];
    // hair
    let hairResult = await AvatarEditorUtils.setupAvatarAssetModel(
      this.scenePresenter,
      baseSkeleton,
      avatarEntity.hair,
      AvatarModelAssetPaths.hairPath,
      anchorNodes.hairNode,
    );
    // hair color
    if (hairResult) {
      AvatarEditorUtils.setupAvatarColor(
        hairResult.meshes[1],
        avatarEntity.hairColor,
        0.125,
        0.5,
      );
    }
    // beard
    let beardResult = await AvatarEditorUtils.setupAvatarAssetModel(
      this.scenePresenter,
      baseSkeleton,
      avatarEntity.beard,
      AvatarModelAssetPaths.beardPath,
      anchorNodes.beardNode,
    );
    // beard color
    if (beardResult) {
      AvatarEditorUtils.setupAvatarColor(
        beardResult.meshes[1],
        avatarEntity.hairColor,
        0.125,
        0.5,
      );
    }
    // headgear
    AvatarEditorUtils.setupAvatarAssetModel(
      this.scenePresenter,
      baseSkeleton,
      avatarEntity.headgear,
      AvatarModelAssetPaths.headgearPath,
      anchorNodes.headgearNode,
    );
    // glasses
    AvatarEditorUtils.setupAvatarAssetModel(
      this.scenePresenter,
      baseSkeleton,
      avatarEntity.glasses,
      AvatarModelAssetPaths.glassesPath,
      anchorNodes.glassesNode,
    );
    // backpack
    AvatarEditorUtils.setupAvatarAssetModel(
      this.scenePresenter,
      baseSkeleton,
      avatarEntity.backpack,
      AvatarModelAssetPaths.backpackPath,
      anchorNodes.backpackNode,
      AvatarModelTransforms.backpack,
    );
    // other
    AvatarEditorUtils.setupAvatarAssetModel(
      this.scenePresenter,
      baseSkeleton,
      avatarEntity.other,
      AvatarModelAssetPaths.otherPath,
      anchorNodes.otherNode,
      AvatarModelTransforms.sheriffStar,
    );
    // shirt
    let shirtResult = await AvatarEditorUtils.setupAvatarAssetModel(
      this.scenePresenter,
      baseSkeleton,
      avatarEntity.shirt,
      AvatarModelAssetPaths.shirtPath,
      anchorNodes.shirtNode,
    );
    //shirt color
    if (shirtResult) {
      AvatarEditorUtils.setupAvatarColor(
        shirtResult.meshes[1],
        avatarEntity.shirtColor,
      );
      AvatarEditorUtils.setupSkinColor(
        shirtResult.meshes as Mesh[],
        avatarEntity.skinColor,
      );
    }
    // pants
    let pantsResult = await AvatarEditorUtils.setupAvatarAssetModel(
      this.scenePresenter,
      baseSkeleton,
      avatarEntity.pants,
      AvatarModelAssetPaths.pantsPath,
      anchorNodes.pantsNode,
    );
    // pants color
    if (pantsResult) {
      AvatarEditorUtils.setupAvatarColor(
        pantsResult.meshes[1],
        avatarEntity.pantsColor,
      );
      AvatarEditorUtils.setupSkinColor(
        pantsResult.meshes as Mesh[],
        avatarEntity.skinColor,
      );
    }
    // shoes
    let shoesResult = await AvatarEditorUtils.setupAvatarAssetModel(
      this.scenePresenter,
      baseSkeleton,
      avatarEntity.shoes,
      AvatarModelAssetPaths.shoesPath,
      anchorNodes.shoesNode,
    );
    // shoes color
    if (shoesResult) {
      AvatarEditorUtils.setupAvatarColor(
        shoesResult.meshes[1],
        avatarEntity.shoesColor,
      );
      AvatarEditorUtils.setupSkinColor(
        shoesResult.meshes as Mesh[],
        avatarEntity.skinColor,
      );
    }
    // eyebrows
    AvatarEditorUtils.setupAvatarTextures(
      avatarEntity.eyebrows,
      result.meshes as Mesh[],
      AvatarModelMaterialNames.eyebrows,
      AvatarEyeBrowTexture,
    );
    // eyes
    AvatarEditorUtils.setupAvatarTextures(
      avatarEntity.eyes,
      result.meshes as Mesh[],
      AvatarModelMaterialNames.eyes,
      AvatarEyeTexture,
    );
    // nose
    AvatarEditorUtils.setupAvatarTextures(
      avatarEntity.nose,
      result.meshes as Mesh[],
      AvatarModelMaterialNames.nose,
      AvatarNoseTexture,
    );
    // mouth
    AvatarEditorUtils.setupAvatarTextures(
      avatarEntity.mouth,
      result.meshes as Mesh[],
      AvatarModelMaterialNames.mouth,
      AvatarMouthTexture,
    );
    // skin color
    AvatarEditorUtils.setupSkinColor(
      this.viewModel.meshes,
      avatarEntity.skinColor,
    );
  }
}
