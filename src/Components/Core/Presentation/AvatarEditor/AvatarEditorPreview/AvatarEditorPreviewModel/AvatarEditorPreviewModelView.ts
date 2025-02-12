import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import {
  Material,
  Mesh,
  Skeleton,
  Texture,
  TransformNode,
} from "@babylonjs/core";
import IScenePresenter from "../../../Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import AvatarEditorPreviewSceneDefinition from "../AvatarEditorPreviewSceneDefinition";
import {
  AvatarBackpackModels,
  AvatarBeardModels,
  AvatarGlassesModels,
  AvatarHairModels,
  AvatarHeadgearModels,
  AvatarPantsModels,
  AvatarShoesModels,
  AvatarNoneModel,
  AvatarShirtModels,
  AvatarOtherModels,
} from "src/Components/Core/Domain/AvatarModels/AvatarModelTypes";
import ILoadAvatarConfigUseCase from "src/Components/Core/Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import {
  AvatarEyeBrowTexture,
  AvatarEyeTexture,
  AvatarMouthTexture,
  AvatarNoseTexture,
} from "src/Components/Core/Domain/AvatarModels/AvatarFaceUVTexture";
import { AvatarColor } from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";
import AvatarEditorUtils from "../../AvatarEditorUtils";
import AvatarModelAssetPaths from "src/Components/Core/Domain/AvatarModels/AvatarModelPaths";
import AvatarModelTransforms from "src/Components/Core/Domain/AvatarModels/AvatarModelTransforms";
const baseModelLink = require("../../../../../../Assets/3dModels/sharedModels/avatar/a-avatar-skeleton.glb");

export default class AvatarEditorPreviewModelView {
  private scenePresenter: IScenePresenter;

  private baseModelSkeleton: Skeleton;

  constructor(private viewModel: AvatarEditorPreviewModelViewModel) {
    this.scenePresenter = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    )(AvatarEditorPreviewSceneDefinition);
    viewModel.avatarConfigDiff.subscribe(this.onAvatarConfigChanged);
  }
  private async onAvatarConfigChanged(): Promise<void> {
    this.updateAllModels("diff");
  }

  async asyncSetup(): Promise<void> {
    // load base model and position it
    const result = await this.scenePresenter.loadGLTFModel(baseModelLink);
    this.baseModelSkeleton = result.skeletons[0];

    this.viewModel.baseModelMeshes = result.meshes as Mesh[];
    this.viewModel.baseModelMeshes[0].position.y = -1;

    // Default-Meshes ausblenden
    [
      "skeletonPullover",
      "defaultPants_primitive0",
      "defaultPants_primitive1",
      "defaultShoes_primitive0",
      "defaultShoes_primitive1",
      "defaultTop",
    ].forEach((meshName) => {
      const meshToHide = this.viewModel.baseModelMeshes.find(
        (m) => m.name === meshName,
      );
      if (meshToHide) {
        meshToHide.dispose();
      }
    });

    // find anchor nodes
    const anchorNodes = AvatarEditorUtils.getAvatarAnchorNodes(
      result.transformNodes,
    );
    this.viewModel.hairAnchorNode = anchorNodes.hairNode;
    this.viewModel.beardAnchorNode = anchorNodes.beardNode;
    this.viewModel.shirtAnchorNode = anchorNodes.shirtNode;
    this.viewModel.pantsAnchorNode = anchorNodes.pantsNode;
    this.viewModel.shoesAnchorNode = anchorNodes.shoesNode;
    this.viewModel.headGearAnchorNode = anchorNodes.headGearNode;
    this.viewModel.glassesAnchorNode = anchorNodes.glassesNode;
    this.viewModel.backpackAnchorNode = anchorNodes.backpackNode;
    this.viewModel.otherAnchorNode = anchorNodes.otherNode;

    await CoreDIContainer.get<ILoadAvatarConfigUseCase>(
      USECASE_TYPES.ILoadAvatarConfigUseCase,
    ).executeAsync();
    this.updateAllModels("initial");
  }

  private async updateAllModels(mode: "initial" | "diff") {
    await this.updateHairModels(mode);
    await this.updateFaceModels(mode);
    await this.updateClothingModels(mode);
    await this.updateAccessoireModels(mode);
    await this.updateBodyModels(mode);
  }

  private async updateHairModels(mode: "initial" | "diff") {
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.hair) {
      await this.updateModelHair(this.viewModel.currentAvatarConfig.Value.hair);
    }
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.beard) {
      await this.updateModelBeard(
        this.viewModel.currentAvatarConfig.Value.beard,
      );
    }
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.hairColor) {
      this.updateHairColor(this.viewModel.currentAvatarConfig.Value.hairColor);
      this.updateBeardColor(this.viewModel.currentAvatarConfig.Value.hairColor);
    }
  }

  private updateFaceModels(mode: "initial" | "diff") {
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.eyebrows)
      this.updateEyeBrows(this.viewModel.currentAvatarConfig.Value.eyebrows);
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.eyes)
      this.updateEyes(this.viewModel.currentAvatarConfig.Value.eyes);
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.nose)
      this.updateNose(this.viewModel.currentAvatarConfig.Value.nose);
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.mouth)
      this.updateMouth(this.viewModel.currentAvatarConfig.Value.mouth);
  }

  private async updateClothingModels(mode: "initial" | "diff") {
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.shirt)
      await this.updateModelShirt(
        this.viewModel.currentAvatarConfig.Value.shirt,
      );
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.shirtColor)
      this.updateShirtColor(
        this.viewModel.currentAvatarConfig.Value.shirtColor,
      );
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.pants)
      await this.updateModelPants(
        this.viewModel.currentAvatarConfig.Value.pants,
      );
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.pantsColor)
      this.updatePantsColor(
        this.viewModel.currentAvatarConfig.Value.pantsColor,
      );
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.shoes)
      await this.updateModelShoes(
        this.viewModel.currentAvatarConfig.Value.shoes,
      );
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.shoesColor)
      this.updateShoesColor(
        this.viewModel.currentAvatarConfig.Value.shoesColor,
      );
  }

  private updateAccessoireModels(mode: "initial" | "diff") {
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.headgear)
      this.updateHeadGear(this.viewModel.currentAvatarConfig.Value.headgear);
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.glasses)
      this.updateGlasses(this.viewModel.currentAvatarConfig.Value.glasses);
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.backpack)
      this.updateBackPack(this.viewModel.currentAvatarConfig.Value.backpack);
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.other)
      this.updateOther(this.viewModel.currentAvatarConfig.Value.other);
  }

  private updateBodyModels(mode: "initial" | "diff") {
    if (mode === "initial" || this.viewModel.avatarConfigDiff.Value.skinColor) {
      this.updateSkinColor(
        this.viewModel.currentAvatarConfig.Value.skinColor,
        this.viewModel.baseModelMeshes,
      );
      this.updateSkinColor(
        this.viewModel.currentAvatarConfig.Value.skinColor,
        this.viewModel.shirtAnchorNode.getChildMeshes(),
      );
      this.updateSkinColor(
        this.viewModel.currentAvatarConfig.Value.skinColor,
        this.viewModel.pantsAnchorNode.getChildMeshes(),
      );
      this.updateSkinColor(
        this.viewModel.currentAvatarConfig.Value.skinColor,
        this.viewModel.shoesAnchorNode.getChildMeshes(),
      );
    }
  }

  private async updateModelHair(hair?: AvatarHairModels | undefined) {
    await this.updateModel(
      hair,
      AvatarModelAssetPaths.hairPath,
      this.viewModel.hairMeshes,
      this.viewModel.hairAnchorNode,
    );
  }

  private updateHairColor(hairColor?: AvatarColor) {
    let hairMesh = this.viewModel.hairMeshes.get(
      this.viewModel.currentAvatarConfig.Value.hair,
    );
    let hairMaterial = hairMesh?.[1].material as Material;
    let hairTexture = hairMaterial?.getActiveTextures()[0] as Texture;

    // Set Displacement of current mesh UV Map
    const uDisplacement = 0.125;
    const vDisplacement = 0.5;

    let hairColorUOffeset = hairColor?.uOffset ?? 0;
    let hairColorVOffset = hairColor?.vOffset ?? 0;

    if (hairTexture === undefined) return;
    hairTexture.uOffset = hairColorUOffeset - uDisplacement;
    hairTexture.vOffset = hairColorVOffset - vDisplacement;
  }

  private async updateModelBeard(beard?: AvatarBeardModels | undefined) {
    await this.updateModel(
      beard,
      AvatarModelAssetPaths.beardPath,
      this.viewModel.beardMeshes,
      this.viewModel.beardAnchorNode,
    );
  }

  private updateBeardColor(beardColor?: AvatarColor) {
    let beardMesh = this.viewModel.beardMeshes.get(
      this.viewModel.currentAvatarConfig.Value.beard,
    );
    let beardMaterial = beardMesh?.[1].material as Material;
    let beardTexture = beardMaterial?.getActiveTextures()[0] as Texture;

    // Set Displacement of current mesh UV Map
    const uDisplacement = 0.125;
    const vDisplacement = 0.5;

    let beardColorUOffeset = beardColor?.uOffset ?? 0;
    let beardColorVOffset = beardColor?.vOffset ?? 0;

    if (beardTexture === undefined) return;
    beardTexture.uOffset = beardColorUOffeset - uDisplacement;
    beardTexture.vOffset = beardColorVOffset - vDisplacement;
  }

  private updateHeadGear(headgear?: AvatarHeadgearModels | undefined) {
    this.updateModel(
      headgear,
      AvatarModelAssetPaths.headGearPath,
      this.viewModel.headGearMeshes,
      this.viewModel.headGearAnchorNode,
    );
  }

  private updateGlasses(glasses?: AvatarGlassesModels | undefined) {
    this.updateModel(
      glasses,
      AvatarModelAssetPaths.glassesPath,
      this.viewModel.glassesMeshes,
      this.viewModel.glassesAnchorNode,
    );
  }

  private updateBackPack(backpack?: AvatarBackpackModels | undefined) {
    this.updateModel(
      backpack,
      AvatarModelAssetPaths.backpackPath,
      this.viewModel.backpackMeshes,
      this.viewModel.backpackAnchorNode,
      AvatarModelTransforms.backpack,
    );
  }

  private updateOther(other?: AvatarOtherModels) {
    this.updateModel(
      other,
      AvatarModelAssetPaths.otherPath,
      this.viewModel.otherMeshes,
      this.viewModel.otherAnchorNode,
      AvatarModelTransforms.sheriffStar,
    );
  }

  private async updateModelShirt(shirt?: AvatarShirtModels | undefined) {
    await this.updateModel(
      shirt,
      AvatarModelAssetPaths.shirtPath,
      this.viewModel.shirtMeshes,
      this.viewModel.shirtAnchorNode,
    );
  }

  private async updateShirtColor(shirtColor?: AvatarColor) {
    let shirtMesh = this.viewModel.shirtMeshes.get(
      this.viewModel.currentAvatarConfig.Value.shirt,
    );
    let shirtMaterial = shirtMesh?.[1].material as Material;
    let shirtTexture = shirtMaterial?.getActiveTextures()[0] as Texture;

    if (shirtTexture === undefined) return;
    shirtTexture.uOffset = shirtColor?.uOffset ?? 0;
    shirtTexture.vOffset = shirtColor?.vOffset ?? 0;
  }

  private async updateModelPants(pants?: AvatarPantsModels | undefined) {
    await this.updateModel(
      pants,
      AvatarModelAssetPaths.pantsPath,
      this.viewModel.pantsMeshes,
      this.viewModel.pantsAnchorNode,
    );
  }

  private async updatePantsColor(pantsColor?: AvatarColor) {
    let pantsMesh = this.viewModel.pantsMeshes.get(
      this.viewModel.currentAvatarConfig.Value.pants,
    );
    let pantsMaterial = pantsMesh?.[1].material as Material;
    let pantsTexture = pantsMaterial?.getActiveTextures()[0] as Texture;

    if (pantsTexture === undefined) return;
    pantsTexture.uOffset = pantsColor?.uOffset ?? 0;
    pantsTexture.vOffset = pantsColor?.vOffset ?? 0;
  }

  private async updateModelShoes(shoes?: AvatarShoesModels | undefined) {
    await this.updateModel(
      shoes,
      AvatarModelAssetPaths.shoesPath,
      this.viewModel.shoesMeshes,
      this.viewModel.shoesAnchorNode,
    );
  }

  private async updateShoesColor(shoesColor?: AvatarColor) {
    let shoesMesh = this.viewModel.shoesMeshes.get(
      this.viewModel.currentAvatarConfig.Value.shoes,
    );
    let shoesMaterial = shoesMesh?.[1].material as Material;
    let shoesTexture = shoesMaterial?.getActiveTextures()[0] as Texture;

    if (shoesTexture === undefined) return;
    shoesTexture.uOffset = shoesColor?.uOffset ?? 0;
    shoesTexture.vOffset = shoesColor?.vOffset ?? 0;
  }

  private updateEyeBrows(eyebrow?: number) {
    if (eyebrow === undefined || eyebrow === null) return;
    let eyebrowMat = this.viewModel.baseModelMeshes.find((mesh) =>
      mesh.material?.name.includes("mat_Eyebrows"),
    )?.material!;

    let texture = eyebrowMat.getActiveTextures()[0] as Texture;
    const tmp = AvatarEyeBrowTexture[eyebrow];
    texture.uOffset = tmp.uOffset;
    texture.vOffset = tmp.vOffset;
  }

  private updateEyes(eyes?: number) {
    if (eyes === undefined || eyes === null) return;
    let eyeMat = this.viewModel.baseModelMeshes.find((mesh) =>
      mesh.material?.name.includes("mat_Eyes"),
    )?.material!;

    let texture = eyeMat.getActiveTextures()[0] as Texture;
    const tmp = AvatarEyeTexture[eyes];
    texture.uOffset = tmp.uOffset;
    texture.vOffset = tmp.vOffset;
  }

  private updateNose(nose?: number) {
    if (nose === undefined || nose === null) return;
    let noseMat = this.viewModel.baseModelMeshes.find((mesh) =>
      mesh.material?.name.includes("mat_Nose"),
    )?.material!;

    let texture = noseMat.getActiveTextures()[0] as Texture;
    const tmp = AvatarNoseTexture[nose];
    texture.uOffset = tmp.uOffset;
    texture.vOffset = tmp.vOffset;
  }

  private updateMouth(mouth?: number) {
    if (mouth === undefined || mouth === null) return;
    let mouthMat = this.viewModel.baseModelMeshes.find((mesh) =>
      mesh.material?.name.includes("mat_Mouth"),
    )?.material!;

    let texture = mouthMat.getActiveTextures()[0] as Texture;
    const tmp = AvatarMouthTexture[mouth];
    texture.uOffset = tmp.uOffset;
    texture.vOffset = tmp.vOffset;
  }

  private async updateSkinColor(skinColor?: AvatarColor, skinMeshes?: Mesh[]) {
    if (skinColor === undefined || skinColor === null) return;
    if (skinMeshes === undefined || skinMeshes === null) return;
    let skinMat = skinMeshes.find((mesh) =>
      mesh.material?.name.includes("mat_Skin"),
    )?.material;

    // Set Displacement of current mesh UV Map
    const uDisplacement = 0.625;
    const vDisplacement = 0;

    let skinUOffset = skinColor?.uOffset ?? 0;
    let skinVOffset = skinColor?.vOffset ?? 0;

    if (skinMat === undefined || skinMat === null) return;
    let textures = skinMat.getActiveTextures() as Texture[];
    textures.forEach((texture) => {
      if (texture === undefined) return;
      texture.uOffset = skinUOffset - uDisplacement;
      texture.vOffset = skinVOffset - vDisplacement;
    });
  }

  private async updateModel<T>(
    newModel: T,
    modelFolder: string,
    modelMap: Map<T, Mesh[]>,
    anchorNode: TransformNode,
    onMeshLoad?: (mesh: Mesh) => void,
  ): Promise<void> {
    if (newModel === undefined || newModel === null) return;
    // hide all meshes and return if no model is selected
    if (newModel === AvatarNoneModel.None) {
      modelMap.forEach((meshes) => {
        meshes.forEach((mesh) => (mesh.isVisible = false));
      });
      return;
    }

    // load model if not already loaded
    if (!modelMap.has(newModel)) {
      const result = await AvatarEditorUtils.setupAvatarAssetModel(
        this.scenePresenter,
        this.baseModelSkeleton,
        newModel,
        modelFolder,
        anchorNode,
        onMeshLoad,
      );
      modelMap.set(newModel, result!.meshes as Mesh[]);
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
