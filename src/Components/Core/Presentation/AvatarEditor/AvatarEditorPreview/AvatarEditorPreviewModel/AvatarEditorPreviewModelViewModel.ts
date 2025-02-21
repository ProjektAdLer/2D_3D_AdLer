import { Mesh, TransformNode, Vector3 } from "@babylonjs/core";
import AvatarConfigTO from "../../../../../Core/Application/DataTransferObjects/AvatarConfigTO";
import {
  AvatarBackpackModels,
  AvatarBeardModels,
  AvatarGlassesModels,
  AvatarHairModels,
  AvatarHeadgearModels,
  AvatarOtherModels,
  AvatarPantsModels,
  AvatarShoesModels,
  AvatarShirtModels,
} from "../../../../../Core/Domain/AvatarModels/AvatarModelTypes";
import Observable from "../../../../../../Lib/Observable";

export default class AvatarEditorPreviewModelViewModel {
  baseModelMeshes: Mesh[];

  // anchor nodes
  hairAnchorNode: TransformNode;
  beardAnchorNode: TransformNode;
  headgearAnchorNode: TransformNode;
  glassesAnchorNode: TransformNode;
  backpackAnchorNode: TransformNode;
  otherAnchorNode: TransformNode;
  shirtAnchorNode: TransformNode;
  pantsAnchorNode: TransformNode;
  shoesAnchorNode: TransformNode;

  // mesh maps
  hairMeshes: Map<AvatarHairModels, Mesh[]> = new Map();
  beardMeshes: Map<AvatarBeardModels, Mesh[]> = new Map();
  headgearMeshes: Map<AvatarHeadgearModels, Mesh[]> = new Map();
  glassesMeshes: Map<AvatarGlassesModels, Mesh[]> = new Map();
  backpackMeshes: Map<AvatarBackpackModels, Mesh[]> = new Map();
  otherMeshes: Map<AvatarOtherModels, Mesh[]> = new Map();
  shirtMeshes: Map<AvatarShirtModels, Mesh[]> = new Map();
  pantsMeshes: Map<AvatarPantsModels, Mesh[]> = new Map();
  shoesMeshes: Map<AvatarShoesModels, Mesh[]> = new Map();

  currentAvatarConfig: Observable<AvatarConfigTO> =
    new Observable<AvatarConfigTO>();
  avatarConfigDiff: Observable<Partial<AvatarConfigTO>> = new Observable<
    Partial<AvatarConfigTO>
  >();

  // constants
  backpackPositionOffset = new Vector3(0, 0.36, 0);
}
