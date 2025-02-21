import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import { Mesh, Skeleton, TransformNode } from "@babylonjs/core";
import IScenePresenter from "../../../Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import AvatarEditorPreviewSceneDefinition from "../AvatarEditorPreviewSceneDefinition";
import { AvatarNoneModel } from "src/Components/Core/Domain/AvatarModels/AvatarModelTypes";
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
import bind from "bind-decorator";
import AvatarConfigTO from "src/Components/Core/Application/DataTransferObjects/AvatarConfigTO";
import AvatarModelMaterialNames from "src/Components/Core/Domain/AvatarModels/AvatarModelMaterialNames";
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

  @bind
  private async onAvatarConfigChanged(): Promise<void> {
    await Promise.resolve(
      this.updateAllModels(this.viewModel.avatarConfigDiff.Value),
    );
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
    this.viewModel.headgearAnchorNode = anchorNodes.headgearNode;
    this.viewModel.glassesAnchorNode = anchorNodes.glassesNode;
    this.viewModel.backpackAnchorNode = anchorNodes.backpackNode;
    this.viewModel.otherAnchorNode = anchorNodes.otherNode;

    await CoreDIContainer.get<ILoadAvatarConfigUseCase>(
      USECASE_TYPES.ILoadAvatarConfigUseCase,
    ).executeAsync();
    await this.updateAllModels(this.viewModel.currentAvatarConfig.Value);
  }

  private async updateAllModels(
    config: Partial<AvatarConfigTO>,
  ): Promise<void> {
    await Promise.all([
      this.updateHairModels(config),
      this.updateFaceModels(config),
      this.updateClothingModels(config),
      this.updateAccessoireModels(config),
    ]);
    await this.updateBodyModels(config);
  }

  private async updateHairModels(
    config: Partial<AvatarConfigTO>,
  ): Promise<void> {
    if (config.hair) {
      await Promise.resolve(
        this.updateModel(
          this.viewModel.currentAvatarConfig.Value.hair,
          AvatarModelAssetPaths.hairPath,
          this.viewModel.hairMeshes,
          this.viewModel.hairAnchorNode,
        ),
      );
      if (this.viewModel.currentAvatarConfig.Value.hair !== "none") {
        AvatarEditorUtils.setupAvatarColor(
          this.viewModel.hairMeshes.get(
            this.viewModel.currentAvatarConfig.Value.hair,
          )![1],
          this.viewModel.currentAvatarConfig.Value.hairColor,
          0.125,
          0.5,
        );
      }
    }
    if (config.beard) {
      await Promise.resolve(
        this.updateModel(
          this.viewModel.currentAvatarConfig.Value.beard,
          AvatarModelAssetPaths.beardPath,
          this.viewModel.beardMeshes,
          this.viewModel.beardAnchorNode,
        ),
      );
      if (this.viewModel.currentAvatarConfig.Value.beard !== "none") {
        AvatarEditorUtils.setupAvatarColor(
          this.viewModel.beardMeshes.get(
            this.viewModel.currentAvatarConfig.Value.beard,
          )![1],
          this.viewModel.currentAvatarConfig.Value.hairColor,
          0.125,
          0.5,
        );
      }
    }
    if (config.hairColor) {
      if (this.viewModel.currentAvatarConfig.Value.hair !== "none") {
        AvatarEditorUtils.setupAvatarColor(
          this.viewModel.hairMeshes.get(
            this.viewModel.currentAvatarConfig.Value.hair,
          )![1],
          this.viewModel.currentAvatarConfig.Value.hairColor,
          0.125,
          0.5,
        );
      }
      if (this.viewModel.currentAvatarConfig.Value.beard !== "none") {
        AvatarEditorUtils.setupAvatarColor(
          this.viewModel.beardMeshes.get(
            this.viewModel.currentAvatarConfig.Value.beard,
          )![1],
          this.viewModel.currentAvatarConfig.Value.hairColor,
          0.125,
          0.5,
        );
      }
    }
  }

  private async updateFaceModels(
    config: Partial<AvatarConfigTO>,
  ): Promise<void> {
    if (config.eyebrows) {
      AvatarEditorUtils.setupAvatarTextures(
        config.eyebrows,
        this.viewModel.baseModelMeshes,
        AvatarModelMaterialNames.eyebrows,
        AvatarEyeBrowTexture,
      );
    }
    if (config.eyes) {
      AvatarEditorUtils.setupAvatarTextures(
        config.eyes,
        this.viewModel.baseModelMeshes,
        AvatarModelMaterialNames.eyes,
        AvatarEyeTexture,
      );
    }
    if (config.nose) {
      AvatarEditorUtils.setupAvatarTextures(
        config.nose,
        this.viewModel.baseModelMeshes,
        AvatarModelMaterialNames.nose,
        AvatarNoseTexture,
      );
    }
    if (config.mouth)
      AvatarEditorUtils.setupAvatarTextures(
        config.mouth,
        this.viewModel.baseModelMeshes,
        AvatarModelMaterialNames.mouth,
        AvatarMouthTexture,
      );
  }

  private async updateClothingModels(
    config: Partial<AvatarConfigTO>,
  ): Promise<void> {
    if (config.shirt) {
      await this.updateModel(
        config.shirt,
        AvatarModelAssetPaths.shirtPath,
        this.viewModel.shirtMeshes,
        this.viewModel.shirtAnchorNode,
      );
      AvatarEditorUtils.setupAvatarColor(
        this.viewModel.shirtMeshes.get(
          this.viewModel.currentAvatarConfig.Value.shirt,
        )![1],
        this.viewModel.currentAvatarConfig.Value.shirtColor,
      );
      AvatarEditorUtils.setupSkinColor(
        this.viewModel.shirtMeshes.get(
          this.viewModel.currentAvatarConfig.Value.shirt,
        )!,
        this.viewModel.currentAvatarConfig.Value.skinColor,
      );
    }
    if (config.shirtColor) {
      AvatarEditorUtils.setupAvatarColor(
        this.viewModel.shirtMeshes.get(
          this.viewModel.currentAvatarConfig.Value.shirt,
        )![1],
        this.viewModel.currentAvatarConfig.Value.shirtColor,
      );
    }
    if (config.pants) {
      await this.updateModel(
        config.pants,
        AvatarModelAssetPaths.pantsPath,
        this.viewModel.pantsMeshes,
        this.viewModel.pantsAnchorNode,
      );
      AvatarEditorUtils.setupAvatarColor(
        this.viewModel.pantsMeshes.get(
          this.viewModel.currentAvatarConfig.Value.pants,
        )![1],
        this.viewModel.currentAvatarConfig.Value.pantsColor,
      );
      AvatarEditorUtils.setupSkinColor(
        this.viewModel.pantsMeshes.get(
          this.viewModel.currentAvatarConfig.Value.pants,
        )!,
        this.viewModel.currentAvatarConfig.Value.skinColor,
      );
    }
    if (config.pantsColor) {
      AvatarEditorUtils.setupAvatarColor(
        this.viewModel.pantsMeshes.get(
          this.viewModel.currentAvatarConfig.Value.pants,
        )![1],
        this.viewModel.currentAvatarConfig.Value.pantsColor,
      );
    }
    if (config.shoes) {
      await this.updateModel(
        config.shoes,
        AvatarModelAssetPaths.shoesPath,
        this.viewModel.shoesMeshes,
        this.viewModel.shoesAnchorNode,
      );
      AvatarEditorUtils.setupAvatarColor(
        this.viewModel.shoesMeshes.get(
          this.viewModel.currentAvatarConfig.Value.shoes,
        )![1],
        this.viewModel.currentAvatarConfig.Value.shoesColor,
      );
      AvatarEditorUtils.setupSkinColor(
        this.viewModel.shoesMeshes.get(
          this.viewModel.currentAvatarConfig.Value.shoes,
        )!,
        this.viewModel.currentAvatarConfig.Value.skinColor,
      );
    }
    if (config.shoesColor) {
      AvatarEditorUtils.setupAvatarColor(
        this.viewModel.shoesMeshes.get(
          this.viewModel.currentAvatarConfig.Value.shoes,
        )![1],
        this.viewModel.currentAvatarConfig.Value.shoesColor,
      );
    }
  }

  private updateAccessoireModels(config: Partial<AvatarConfigTO>) {
    if (config.headgear) {
      this.updateModel(
        config.headgear,
        AvatarModelAssetPaths.headgearPath,
        this.viewModel.headgearMeshes,
        this.viewModel.headgearAnchorNode,
      );
    }
    if (config.glasses) {
      this.updateModel(
        config.glasses,
        AvatarModelAssetPaths.glassesPath,
        this.viewModel.glassesMeshes,
        this.viewModel.glassesAnchorNode,
      );
    }
    if (config.backpack) {
      this.updateModel(
        config.backpack,
        AvatarModelAssetPaths.backpackPath,
        this.viewModel.backpackMeshes,
        this.viewModel.backpackAnchorNode,
        AvatarModelTransforms.backpack,
      );
    }
    if (config.other) {
      this.updateModel(
        config.other,
        AvatarModelAssetPaths.otherPath,
        this.viewModel.otherMeshes,
        this.viewModel.otherAnchorNode,
        AvatarModelTransforms.sheriffStar,
      );
    }
  }

  private async updateBodyModels(
    config: Partial<AvatarConfigTO>,
  ): Promise<void> {
    if (config.skinColor) {
      AvatarEditorUtils.setupSkinColor(
        this.viewModel.baseModelMeshes,
        this.viewModel.currentAvatarConfig.Value.skinColor,
      );
      AvatarEditorUtils.setupSkinColor(
        this.viewModel.shirtMeshes.get(
          this.viewModel.currentAvatarConfig.Value.shirt,
        )!,
        this.viewModel.currentAvatarConfig.Value.skinColor,
      );
      AvatarEditorUtils.setupSkinColor(
        this.viewModel.pantsMeshes.get(
          this.viewModel.currentAvatarConfig.Value.pants,
        )!,
        this.viewModel.currentAvatarConfig.Value.skinColor,
      );
      AvatarEditorUtils.setupSkinColor(
        this.viewModel.shoesMeshes.get(
          this.viewModel.currentAvatarConfig.Value.shoes,
        )!,
        this.viewModel.currentAvatarConfig.Value.skinColor,
      );
    }
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
      return Promise.resolve();
    }
    // load model if not already loaded
    if (!modelMap.has(newModel)) {
      const result = await Promise.resolve(
        AvatarEditorUtils.setupAvatarAssetModel(
          this.scenePresenter,
          this.baseModelSkeleton,
          newModel,
          modelFolder,
          anchorNode,
          onMeshLoad,
        ),
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
    return Promise.resolve();
  }
}
