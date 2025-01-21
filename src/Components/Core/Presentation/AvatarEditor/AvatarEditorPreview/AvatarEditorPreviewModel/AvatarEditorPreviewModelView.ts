import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import { AnimationGroup, Mesh, Texture, TransformNode } from "@babylonjs/core";
import IScenePresenter from "../../../Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import AvatarEditorPreviewSceneDefinition from "../AvatarEditorPreviewSceneDefinition";
import {
  AvatarBeardModels,
  AvatarHairModels,
  AvatarPantsModels,
  AvatarShoesModels,
  AvatarNoneModel,
  AvatarShirtModels,
} from "src/Components/Core/Domain/AvatarModels/AvatarModelTypes";
import ILoadAvatarConfigUseCase from "src/Components/Core/Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import {
  AvatarEyeBrowTexture,
  AvatarEyeTexture,
  AvatarMouthTexture,
  AvatarNoseTexture,
} from "src/Components/Core/Domain/AvatarModels/AvatarFaceUVTexture";

const baseModelLink = require("../../../../../../Assets/3dModels/sharedModels/avatar/a-avatar-skeleton.glb");

export default class AvatarEditorPreviewModelView {
  private scenePresenter: IScenePresenter;

  private baseAnimatonGroups: AnimationGroup[];

  private idleAnimationName: string = "ac_anim_idle2";

  constructor(private viewModel: AvatarEditorPreviewModelViewModel) {
    this.scenePresenter = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    )(AvatarEditorPreviewSceneDefinition);

    viewModel.avatarConfigDiff.subscribe(() => {
      this.onAvatarConfigChanged();
    });
  }

  async asyncSetup(): Promise<void> {
    // load base model and position it
    const result = await this.scenePresenter.loadGLTFModel(baseModelLink);
    this.baseAnimatonGroups = result.animationGroups;

    this.viewModel.baseModelMeshes = result.meshes as Mesh[];
    this.viewModel.baseModelMeshes[0].position.y = -1;

    // Default-Meshes ausblenden
    ["defaultPants", "defaultShoes", "defaultTop"].forEach((meshName) => {
      const meshToHide = this.viewModel.baseModelMeshes.find(
        (m) => m.name === meshName,
      );
      if (meshToHide) {
        meshToHide.setEnabled(false);
      }
    });

    // find anchor nodes
    this.viewModel.hairAnchorNode = result.transformNodes.find(
      (node) => node.name === "anker_hair",
    )!;
    this.viewModel.beardAnchorNode = result.transformNodes.find(
      (node) => node.name === "anker_beard",
    )!;
    this.viewModel.shirtAnchorNode = result.transformNodes.find(
      (node) => node.name === "anker_top",
    )!;
    this.viewModel.pantsAnchorNode = result.transformNodes.find(
      (node) => node.name === "anker_pants",
    )!;
    this.viewModel.shoesAnchorNode = result.transformNodes.find(
      (node) => node.name === "anker_shoes",
    )!;
    this.viewModel.shirtAnchorNode = result.transformNodes.find(
      (node) => node.name === "anker_top",
    )!;

    this.viewModel.baseModelMeshes.forEach((mesh) => {
      if (mesh.name === "defaultTop") {
        mesh.dispose();
        this.updateShirt("shirts-sweatshirt");
      }
    });

    await CoreDIContainer.get<ILoadAvatarConfigUseCase>(
      USECASE_TYPES.ILoadAvatarConfigUseCase,
    ).executeAsync();

    this.updateModelHair(this.viewModel.currentAvatarConfig.Value.hair);
    this.updateModelBeard(this.viewModel.currentAvatarConfig.Value.beard);
    this.updateEyeBrows(this.viewModel.currentAvatarConfig.Value.eyebrows);
    this.updateEyes(this.viewModel.currentAvatarConfig.Value.eyes);
    this.updateNose(this.viewModel.currentAvatarConfig.Value.nose);
    this.updateMouth(this.viewModel.currentAvatarConfig.Value.mouth);
    this.updateModelShirt(this.viewModel.currentAvatarConfig.Value.shirt);
    this.updateModelPants(this.viewModel.currentAvatarConfig.Value.pants);
    this.updateModelShoes(this.viewModel.currentAvatarConfig.Value.shoes);
  }

  private onAvatarConfigChanged(): void {
    console.log(this.viewModel.avatarConfigDiff.Value);
    if (this.viewModel.avatarConfigDiff.Value.beard)
      this.updateModelBeard(this.viewModel.avatarConfigDiff.Value.beard);
    if (this.viewModel.avatarConfigDiff.Value.hair)
      this.updateModelHair(this.viewModel.avatarConfigDiff.Value.hair);
    if (this.viewModel.avatarConfigDiff.Value.eyebrows !== undefined)
      this.updateEyeBrows(this.viewModel.avatarConfigDiff.Value.eyebrows);
    if (this.viewModel.avatarConfigDiff.Value.eyes !== undefined)
      this.updateEyes(this.viewModel.avatarConfigDiff.Value.eyes);
    if (this.viewModel.avatarConfigDiff.Value.nose !== undefined)
      this.updateNose(this.viewModel.avatarConfigDiff.Value.nose);
    if (this.viewModel.avatarConfigDiff.Value.mouth !== undefined)
      this.updateMouth(this.viewModel.avatarConfigDiff.Value.mouth);
    if (this.viewModel.avatarConfigDiff.Value.shirt !== undefined)
      this.updateModelShirt(this.viewModel.avatarConfigDiff.Value.shirt);
    if (this.viewModel.avatarConfigDiff.Value.pants !== undefined)
      this.updateModelPants(this.viewModel.avatarConfigDiff.Value.pants);
    if (this.viewModel.avatarConfigDiff.Value.shoes !== undefined)
      this.updateModelShoes(this.viewModel.avatarConfigDiff.Value.shoes);
  }

  private updateModelHair(hair?: AvatarHairModels | undefined) {
    if (!hair) return;
    this.updateModel(
      hair,
      "hair/hairstyle",
      this.viewModel.hairMeshes,
      this.viewModel.hairAnchorNode,
    );
  }

  private updateModelBeard(beard?: AvatarBeardModels | undefined) {
    if (!beard) return;
    this.updateModel(
      beard,
      "hair/beards",
      this.viewModel.beardMeshes,
      this.viewModel.beardAnchorNode,
    );
  }

  private async updateShirt(shirt?: AvatarShirtModels | undefined) {
    if (!shirt) return;

    await this.updateModel(
      shirt,
      "clothing/shirts",
      this.viewModel.shirtMeshes,
      this.viewModel.shirtAnchorNode,
    );
  }

  private updateModelShirt(shirt?: AvatarShirtModels | undefined) {
    this.updateModel(
      shirt,
      "clothing/shirts",
      this.viewModel.shirtMeshes,
      this.viewModel.shirtAnchorNode,
    );
    this.viewModel.shirtMeshes.forEach((meshes) => {
      meshes.forEach((mesh) => {
        mesh.skeleton = this.viewModel.baseModelMeshes[0].skeleton;
      });
    });
  }

  private updateModelPants(pants?: AvatarPantsModels | undefined) {
    this.updateModel(
      pants,
      "clothing/pants",
      this.viewModel.pantsMeshes,
      this.viewModel.pantsAnchorNode,
    );
  }

  private updateModelShoes(shirt?: AvatarShoesModels | undefined) {
    this.updateModel(
      shirt,
      "clothing/shoes",
      this.viewModel.shoesMeshes,
      this.viewModel.shoesAnchorNode,
    );
  }

  private updateEyeBrows(eyebrow?: number) {
    if (eyebrow === undefined || eyebrow === null) return;
    let eyebrowMat = this.viewModel.baseModelMeshes.find((mesh) =>
      mesh.material?.name.includes("Eyebrow_mat"),
    )?.material!;

    let texture = eyebrowMat.getActiveTextures()[0] as Texture;
    const tmp = AvatarEyeBrowTexture[eyebrow];
    texture.uOffset = tmp.uOffset;
    texture.vOffset = tmp.vOffset;
  }

  private updateEyes(eyes?: number) {
    if (eyes === undefined || eyes === null) return;
    let eyeMat = this.viewModel.baseModelMeshes.find((mesh) =>
      mesh.material?.name.includes("Eyes_mat"),
    )?.material!;

    let texture = eyeMat.getActiveTextures()[0] as Texture;
    const tmp = AvatarEyeTexture[eyes];
    texture.uOffset = tmp.uOffset;
    texture.vOffset = tmp.vOffset;
  }

  private updateNose(nose?: number) {
    if (nose === undefined || nose === null) return;
    let noseMat = this.viewModel.baseModelMeshes.find((mesh) =>
      mesh.material?.name.includes("Nose_mat"),
    )?.material!;

    let texture = noseMat.getActiveTextures()[0] as Texture;
    const tmp = AvatarNoseTexture[nose];
    texture.uOffset = tmp.uOffset;
    texture.vOffset = tmp.vOffset;
  }

  private updateMouth(mouth?: number) {
    if (mouth === undefined || mouth === null) return;
    let mouthMat = this.viewModel.baseModelMeshes.find((mesh) =>
      mesh.material?.name.includes("Mouth_mat"),
    )?.material!;

    let texture = mouthMat.getActiveTextures()[0] as Texture;
    const tmp = AvatarMouthTexture[mouth];
    texture.uOffset = tmp.uOffset;
    texture.vOffset = tmp.vOffset;
  }

  private async updateModel<T>(
    newModel: T,
    modelFolder: string,
    modelMap: Map<T, Mesh[]>,
    anchorNode: TransformNode,
  ): Promise<void> {
    // hide all meshes and return if no model is selected
    if (newModel === AvatarNoneModel.None) {
      modelMap.forEach((meshes) => {
        meshes.forEach((mesh) => (mesh.isVisible = false));
      });
      return;
    }

    // load model if not already loaded
    //if (!modelMap.has(newModel))
    {
      const result = await this.scenePresenter.loadGLTFModel(
        require(
          `../../../../../../Assets/3dModels/sharedModels/avatar/${modelFolder}/aa-${newModel}.glb`,
        ),
      );
      modelMap.set(newModel, result.meshes as Mesh[]);
      result.meshes[0].parent = anchorNode;

      let idleAnim: AnimationGroup;
      let syncFrame: number;
      this.baseAnimatonGroups.forEach((animation) => {
        if (animation.name.includes(this.idleAnimationName)) {
          idleAnim = animation;
        }
      });

      result.animationGroups.forEach((animation) => {
        if (animation.name.includes(this.idleAnimationName)) {
          idleAnim.pause();
          syncFrame = idleAnim.getCurrentFrame();

          idleAnim.restart();
          animation.goToFrame(syncFrame);
        }
      });

      console.log("BaseModel-Animations");
      this.baseAnimatonGroups.forEach((animation) => {
        console.log(animation.name, ", isPlaying: ", animation.isPlaying);
      });
      console.log("Current-animations");
      result.animationGroups.forEach((animation) => {
        console.log(animation.name, ", isPlaying: ", animation.isPlaying);
      });
    }

    // set all meshes to invisible except the new model
    modelMap.forEach((meshes, type) => {
      const newIsVisible = type === newModel;
      meshes.forEach((mesh) => {
        mesh.isVisible = newIsVisible;
      });
    });
  }
}
