import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import {
  Material,
  Mesh,
  Skeleton,
  Texture,
  TransformNode,
  Vector3,
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

const baseModelLink = require("../../../../../../Assets/3dModels/sharedModels/avatar/a-avatar-skeleton.glb");

export default class AvatarEditorPreviewModelView {
  private scenePresenter: IScenePresenter;

  private baseModelSkeleton: Skeleton;

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
    this.baseModelSkeleton = result.skeletons[0];

    this.viewModel.baseModelMeshes = result.meshes as Mesh[];
    this.viewModel.baseModelMeshes[0].position.y = -1;

    // Default-Meshes ausblenden
    [
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
    this.viewModel.hairAnchorNode = result.transformNodes.find(
      (node) => node.name === "anchor_hair",
    )!;
    this.viewModel.beardAnchorNode = result.transformNodes.find(
      (node) => node.name === "anchor_beard",
    )!;
    this.viewModel.shirtAnchorNode = result.transformNodes.find(
      (node) => node.name === "anchor_top",
    )!;
    this.viewModel.pantsAnchorNode = result.transformNodes.find(
      (node) => node.name === "anchor_pants",
    )!;
    this.viewModel.shoesAnchorNode = result.transformNodes.find(
      (node) => node.name === "anchor_shoes",
    )!;
    this.viewModel.headGearAnchorNode = result.transformNodes.find(
      (node) => node.name === "anchor_hat",
    )!;
    this.viewModel.glassesAnchorNode = result.transformNodes.find(
      (node) => node.name === "anchor_glasses",
    )!;
    this.viewModel.backpackAnchorNode = result.transformNodes.find(
      (node) => node.name === "Spine",
    )!;
    this.viewModel.otherAnchorNode = result.transformNodes.find(
      (node) => node.name === "Spine",
    )!;

    console.log(this.viewModel.backpackAnchorNode);
    result.transformNodes.forEach((node) => {
      console.log(node.name, " / ", node.parent?.name);
    });

    // this.viewModel.baseModelMeshes.forEach((mesh) => {
    //   if (mesh.name === "defaultTop") {
    //     mesh.dispose();
    //   }
    //   if (mesh.name === "defaultPants") {
    //     mesh.dispose();
    //   }
    //   if (mesh.name === "defaultShoes") {
    //     mesh.dispose();
    //   }
    // });

    await CoreDIContainer.get<ILoadAvatarConfigUseCase>(
      USECASE_TYPES.ILoadAvatarConfigUseCase,
    ).executeAsync();

    this.updateModelHair(this.viewModel.currentAvatarConfig.Value.hair);
    this.updateHairColor(this.viewModel.currentAvatarConfig.Value.hairColor);
    this.updateModelBeard(this.viewModel.currentAvatarConfig.Value.beard);
    this.updateEyeBrows(this.viewModel.currentAvatarConfig.Value.eyebrows);
    this.updateEyes(this.viewModel.currentAvatarConfig.Value.eyes);
    this.updateNose(this.viewModel.currentAvatarConfig.Value.nose);
    this.updateMouth(this.viewModel.currentAvatarConfig.Value.mouth);
    this.updateModelShirt(this.viewModel.currentAvatarConfig.Value.shirt);
    this.updateModelPants(this.viewModel.currentAvatarConfig.Value.pants);
    this.updateModelShoes(this.viewModel.currentAvatarConfig.Value.shoes);
    this.updateHeadGear(this.viewModel.currentAvatarConfig.Value.headgear);
    this.updateGlasses(this.viewModel.currentAvatarConfig.Value.glasses);
    this.updateBackPack(this.viewModel.currentAvatarConfig.Value.backpack);
    this.updateOther(this.viewModel.currentAvatarConfig.Value.other);
  }

  private onAvatarConfigChanged(): void {
    //console.log(this.viewModel.avatarConfigDiff.Value);
    if (this.viewModel.avatarConfigDiff.Value.beard)
      this.updateModelBeard(this.viewModel.avatarConfigDiff.Value.beard);
    if (this.viewModel.avatarConfigDiff.Value.hair)
      this.updateModelHair(this.viewModel.avatarConfigDiff.Value.hair);
    if (this.viewModel.avatarConfigDiff.Value.hairColor)
      this.updateHairColor(this.viewModel.avatarConfigDiff.Value.hairColor);
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
    if (this.viewModel.avatarConfigDiff.Value.headgear !== undefined)
      this.updateHeadGear(this.viewModel.avatarConfigDiff.Value.headgear);
    if (this.viewModel.avatarConfigDiff.Value.glasses !== undefined)
      this.updateGlasses(this.viewModel.avatarConfigDiff.Value.glasses);
    if (this.viewModel.avatarConfigDiff.Value.backpack !== undefined)
      this.updateBackPack(this.viewModel.avatarConfigDiff.Value.backpack);
    if (this.viewModel.avatarConfigDiff.Value.other !== undefined)
      this.updateOther(this.viewModel.avatarConfigDiff.Value.other);
  }

  private updateModelHair(hair?: AvatarHairModels | undefined) {
    this.updateModel(
      hair,
      "hair/hairstyle",
      this.viewModel.hairMeshes,
      this.viewModel.hairAnchorNode,
    );
  }

  private async updateHairColor(hairColor?: AvatarColor) {
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

  private updateModelBeard(beard?: AvatarBeardModels | undefined) {
    this.updateModel(
      beard,
      "hair/beards",
      this.viewModel.beardMeshes,
      this.viewModel.beardAnchorNode,
    );
  }

  private updateHeadGear(headgear?: AvatarHeadgearModels | undefined) {
    this.updateModel(
      headgear,
      "accessoires/headgear",
      this.viewModel.headGearMeshes,
      this.viewModel.headGearAnchorNode,
    );
  }

  private updateGlasses(glasses?: AvatarGlassesModels | undefined) {
    this.updateModel(
      glasses,
      "accessoires/glasses",
      this.viewModel.glassesMeshes,
      this.viewModel.glassesAnchorNode,
    );
  }

  private updateBackPack(backpack?: AvatarBackpackModels | undefined) {
    this.updateModel(
      backpack,
      "accessoires/backpack",
      this.viewModel.backpackMeshes,
      this.viewModel.backpackAnchorNode,
      (mesh) => {
        mesh.position = this.viewModel.backpackPositionOffset;
      },
    );
  }

  private updateOther(other?: AvatarOtherModels) {
    this.updateModel(
      other,
      "accessoires/other",
      this.viewModel.otherMeshes,
      this.viewModel.otherAnchorNode,
      (mesh) => {
        mesh.position = new Vector3(0, 0.28, 0.04);
      },
    );
  }

  private updateModelShirt(shirt?: AvatarShirtModels | undefined) {
    this.updateModel(
      shirt,
      "clothing/shirts",
      this.viewModel.shirtMeshes,
      this.viewModel.shirtAnchorNode,
    );
  }

  private updateModelPants(pants?: AvatarPantsModels | undefined) {
    this.updateModel(
      pants,
      "clothing/pants",
      this.viewModel.pantsMeshes,
      this.viewModel.pantsAnchorNode,
    );
  }

  private updateModelShoes(shoes?: AvatarShoesModels | undefined) {
    this.updateModel(
      shoes,
      "clothing/shoes",
      this.viewModel.shoesMeshes,
      this.viewModel.shoesAnchorNode,
    );
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
      const result = await this.scenePresenter.loadGLTFModel(
        require(
          `../../../../../../Assets/3dModels/sharedModels/avatar/${modelFolder}/aa-${newModel}.glb`,
        ),
      );
      result.meshes.forEach((mesh) => {
        if (mesh instanceof Mesh) {
          // Stelle sicher, dass es ein Mesh ist
          mesh.skeleton = this.baseModelSkeleton;
        }
      });

      modelMap.set(newModel, result.meshes as Mesh[]);
      result.meshes[0].parent = anchorNode;
      if (onMeshLoad) onMeshLoad(result.meshes[0] as Mesh);
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
