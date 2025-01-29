import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import { Mesh, Skeleton, Texture, TransformNode } from "@babylonjs/core";
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
import AvatarEditorUtils from "../../AvatarEditorUtils";
import AvatarModelAssetPaths from "src/Components/Core/Domain/AvatarModels/AvatarModelPaths";
import AvatarModelTransforms from "src/Components/Core/Domain/AvatarModels/AvatarModelTransforms";
import AvatarModelMaterialNames from "src/Components/Core/Domain/AvatarModels/AvatarModelMaterialNames";

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

    // hair
    this.updateModelHair(this.viewModel.currentAvatarConfig.Value.hair);
    this.updateModelBeard(this.viewModel.currentAvatarConfig.Value.beard);
    // face
    this.updateEyeBrows(this.viewModel.currentAvatarConfig.Value.eyebrows);
    this.updateEyes(this.viewModel.currentAvatarConfig.Value.eyes);
    this.updateNose(this.viewModel.currentAvatarConfig.Value.nose);
    this.updateMouth(this.viewModel.currentAvatarConfig.Value.mouth);
    // accessoires
    this.updateHeadGear(this.viewModel.currentAvatarConfig.Value.headgear);
    this.updateGlasses(this.viewModel.currentAvatarConfig.Value.glasses);
    this.updateBackPack(this.viewModel.currentAvatarConfig.Value.backpack);
    this.updateOther(this.viewModel.currentAvatarConfig.Value.other);
    // clothing
    this.updateModelShirt(this.viewModel.currentAvatarConfig.Value.shirt);
    this.updateModelPants(this.viewModel.currentAvatarConfig.Value.pants);
    this.updateModelShoes(this.viewModel.currentAvatarConfig.Value.shoes);
  }

  private onAvatarConfigChanged(): void {
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
      AvatarModelAssetPaths.hairPath,
      this.viewModel.hairMeshes,
      this.viewModel.hairAnchorNode,
    );
  }

  private updateModelBeard(beard?: AvatarBeardModels | undefined) {
    this.updateModel(
      beard,
      AvatarModelAssetPaths.beardPath,
      this.viewModel.beardMeshes,
      this.viewModel.beardAnchorNode,
    );
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

  private updateModelShirt(shirt?: AvatarShirtModels | undefined) {
    this.updateModel(
      shirt,
      AvatarModelAssetPaths.shirtPath,
      this.viewModel.shirtMeshes,
      this.viewModel.shirtAnchorNode,
    );
  }

  private updateModelPants(pants?: AvatarPantsModels | undefined) {
    this.updateModel(
      pants,
      AvatarModelAssetPaths.pantsPath,
      this.viewModel.pantsMeshes,
      this.viewModel.pantsAnchorNode,
    );
  }

  private updateModelShoes(shoes?: AvatarShoesModels | undefined) {
    this.updateModel(
      shoes,
      AvatarModelAssetPaths.shoesPath,
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
