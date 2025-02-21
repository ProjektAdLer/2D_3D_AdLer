import {
  AbstractMesh,
  ISceneLoaderAsyncResult,
  Material,
  Mesh,
  Skeleton,
  Texture,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import IScenePresenter from "../Babylon/SceneManagement/IScenePresenter";
import { AvatarNoneModel } from "../../Domain/AvatarModels/AvatarModelTypes";
import { AvatarUVOffset } from "../../Domain/AvatarModels/AvatarFaceUVTexture";
import { AvatarColor } from "../../Domain/AvatarModels/AvatarColorPalette";

export default class AvatarEditorUtils {
  public static async setupAvatarAssetModel<T>(
    scenePresenter: IScenePresenter,
    avatartSkeleton: Skeleton,
    newModel: T,
    modelFolder: string,
    anchorNode: TransformNode,
    onMeshLoaded?: (mesh: Mesh) => void,
  ): Promise<ISceneLoaderAsyncResult | void> {
    if (
      newModel === undefined ||
      newModel === null ||
      newModel === AvatarNoneModel.None
    )
      return;

    const result = await scenePresenter.loadGLTFModel(
      require(
        `src/Assets/3dModels/sharedModels/avatar/${modelFolder}/aa-${newModel}.glb`,
      ),
    );
    result.animationGroups.forEach((animation) => {
      animation.dispose();
    });
    result.meshes.forEach((mesh) => {
      if (mesh instanceof Mesh) {
        mesh.skeleton?.dispose();
        mesh.skeleton = avatartSkeleton;
      }
    });
    result.meshes[0].parent = anchorNode;
    if (onMeshLoaded) onMeshLoaded(result.meshes[0] as Mesh);
    return result;
  }

  public static getAvatarAnchorNodes(nodes: TransformNode[]): {
    hairNode: TransformNode;
    beardNode: TransformNode;
    shirtNode: TransformNode;
    pantsNode: TransformNode;
    shoesNode: TransformNode;
    headgearNode: TransformNode;
    glassesNode: TransformNode;
    backpackNode: TransformNode;
    otherNode: TransformNode;
  } {
    const hairAnchorNode = nodes.find((node) => node.name === "anchor_hair")!;
    const beardAnchorNode = nodes.find((node) => node.name === "anchor_beard")!;
    const shirtAnchorNode = nodes.find((node) => node.name === "anchor_top")!;
    const pantsAnchorNode = nodes.find((node) => node.name === "anchor_pants")!;
    const shoesAnchorNode = nodes.find((node) => node.name === "anchor_shoes")!;
    const headgearAnchorNode = nodes.find(
      (node) => node.name === "anchor_hat",
    )!;
    const glassesAnchorNode = nodes.find(
      (node) => node.name === "anchor_glasses",
    )!;
    const backpackAnchorNode = nodes.find((node) => node.name === "Spine")!;
    const otherAnchorNode = nodes.find((node) => node.name === "Spine")!;
    // models are per default mirrored
    shirtAnchorNode.scaling = new Vector3(-1, 1, 1);
    pantsAnchorNode.scaling = new Vector3(-1, 1, 1);
    shoesAnchorNode.scaling = new Vector3(-1, 1, 1);

    return {
      hairNode: hairAnchorNode,
      beardNode: beardAnchorNode,
      shirtNode: shirtAnchorNode,
      pantsNode: pantsAnchorNode,
      shoesNode: shoesAnchorNode,
      headgearNode: headgearAnchorNode,
      glassesNode: glassesAnchorNode,
      backpackNode: backpackAnchorNode,
      otherNode: otherAnchorNode,
    };
  }

  public static setupAvatarTextures(
    textureIndex: number,
    meshes: Mesh[],
    materialName: string,
    textureOffset: AvatarUVOffset[],
  ) {
    if (textureIndex === undefined || textureIndex === null) return;
    const texture = meshes
      .find((mesh) => mesh.material?.name.includes(materialName))
      ?.material!.getActiveTextures()[0] as Texture;
    texture.uOffset = textureOffset[textureIndex].uOffset;
    texture.vOffset = textureOffset[textureIndex].vOffset;
  }

  public static setupAvatarColor(
    mesh: AbstractMesh,
    meshColor: AvatarColor,
    displacementU: number = 0,
    displacementV: number = 0,
  ) {
    if (meshColor === undefined || meshColor === null) return;

    let meshMaterial = mesh.material as Material;
    let meshTexture = meshMaterial?.getActiveTextures()[0] as Texture;

    if (meshTexture === undefined) return;
    // Set Displacement of current mesh UV Map

    let meshColorUOffeset = meshColor?.uOffset ?? 0;
    let meshColorVOffset = meshColor?.vOffset ?? 0;

    if (meshTexture === undefined) return;
    meshTexture.uOffset = meshColorUOffeset - displacementU;
    meshTexture.vOffset = meshColorVOffset - displacementV;
  }

  public static setupSkinColor(skinMeshes: Mesh[], skinColor: AvatarColor) {
    if (skinColor === undefined || skinColor === null) return;
    if (skinMeshes === undefined || skinMeshes === null) return;
    let skinMat = skinMeshes.find((mesh) =>
      mesh.material?.name.includes("mat_Skin"),
    )?.material!;

    // Set Displacement of current mesh UV Map
    const uDisplacement = 0.625;
    const vDisplacement = 0;

    let skinUOffset = skinColor?.uOffset ?? 0;
    let skinVOffset = skinColor?.vOffset ?? 0;

    if (skinMat === undefined) return;
    let textures = skinMat.getActiveTextures() as Texture[];
    textures.forEach((texture) => {
      if (texture === undefined) return;
      texture.uOffset = skinUOffset - uDisplacement;
      texture.vOffset = skinVOffset - vDisplacement;
    });
  }
}
