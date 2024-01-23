import { Mesh, Quaternion, Vector3 } from "@babylonjs/core";
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
import CharacterNavigator from "../CharacterNavigator/CharacterNavigator";
import { config } from "src/config";
import CharacterAnimator from "../CharacterAnimator/CharacterAnimator";
import bind from "bind-decorator";

const modelLink = require("../../../../../Assets/3dModels/sharedModels/3DModel_Avatar_male.glb");

export default class AvatarView {
  private scenePresenter: IScenePresenter;
  private movementIndicator: IMovementIndicator;
  private walkAnimation: AnimationGroup;
  private idleAnimation: AnimationGroup;
  private interactionAnimation: AnimationGroup;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.movementIndicator = CoreDIContainer.get<IMovementIndicator>(
      PRESENTATION_TYPES.IMovementIndicator
    );

    this.viewModel.movementTarget.subscribe(this.onMovementTargetChanged);
  }

  public async asyncSetup(): Promise<void> {
    await this.loadAvatarAsync();
    this.setupBlinkAnimation();

    this.viewModel.characterAnimator = new CharacterAnimator(
      () => this.viewModel.characterNavigator.CharacterVelocity,
      this.idleAnimation,
      this.walkAnimation,
      this.interactionAnimation
    );

    this.viewModel.characterNavigator = new CharacterNavigator(
      this.viewModel.parentNode,
      this.viewModel.meshes[0],
      this.viewModel.characterAnimator,
      config.isDebug
    );
    await this.viewModel.characterNavigator.IsReady;
  }

  private async loadAvatarAsync(): Promise<void> {
    this.viewModel.parentNode =
      this.scenePresenter.Scene.getTransformNodeByName("AvatarParentNode")!;

    let result = await this.scenePresenter.loadGLTFModel(modelLink);

    // mesh setup
    this.viewModel.meshes = result.meshes as Mesh[];
    this.viewModel.meshes[0].setParent(this.viewModel.parentNode);

    this.viewModel.parentNode.position = this.determineSpawnLocation();
    // place model 0.05 above the ground ~ FK
    this.viewModel.meshes[0].position = new Vector3(0, 0.05, 0);
    this.viewModel.meshes[0].scaling = new Vector3(1, 1, -1);
    this.viewModel.meshes.forEach((mesh) => (mesh.rotationQuaternion = null));
    this.viewModel.meshes[0].rotationQuaternion = new Quaternion(0, 0, 0, 1);

    // animation setup
    result.animationGroups.forEach((animationGroup) => {
      switch (animationGroup.name) {
        case "anim_idle":
          this.idleAnimation = animationGroup;
          break;
        case "anim_walk":
          this.walkAnimation = animationGroup;
          break;
        case "anim_interact":
          this.interactionAnimation = animationGroup;
          break;
      }
    });
  }

  private setupBlinkAnimation(): void {
    const eyeMaterial = this.viewModel.meshes.find(
      (mesh) => mesh.material?.name === "Eyes_mat"
    )?.material!;
    this.viewModel.eyeTextures = eyeMaterial.getActiveTextures() as Texture[];

    this.setBlinkTimeout();
  }

  private setBlinkTimeout(): void {
    setTimeout(() => {
      // set eye texture offset to blink texture
      this.viewModel.eyeTextures.forEach((texture) => {
        texture.uOffset = this.viewModel.blinkTextureUOffset;
      });

      // set timeout to reset eye texture offset and restart blink timeout
      setTimeout(() => {
        this.viewModel.eyeTextures.forEach((texture) => {
          texture.uOffset = 0;
        });
        this.setBlinkTimeout();
      }, this.viewModel.blinkDuration);
    }, this.viewModel.blinkInterval + Math.random() * this.viewModel.blinkIntervalMaxOffset);
  }

  private determineSpawnLocation(): Vector3 {
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

    return spawnLocation;
  }

  @bind
  private onMovementTargetChanged(newTarget: Nullable<Vector3>): void {
    if (newTarget === null) this.movementIndicator.hide();
    else this.movementIndicator.display(newTarget);
  }
}
