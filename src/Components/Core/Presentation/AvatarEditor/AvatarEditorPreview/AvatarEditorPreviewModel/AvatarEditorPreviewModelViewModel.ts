import { Mesh, TransformNode } from "@babylonjs/core";
import AvatarConfigTO from "../../../../../Core/Application/DataTransferObjects/AvatarConfigTO";
import {
  AvatarBeardModels,
  AvatarHairModels,
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
  shirtAnchorNode: TransformNode;
  pantsAnchorNode: TransformNode;
  shoesAnchorNode: TransformNode;

  // mesh maps
  hairMeshes: Map<AvatarHairModels, Mesh[]> = new Map();
  beardMeshes: Map<AvatarBeardModels, Mesh[]> = new Map();
  shirtMeshes: Map<AvatarShirtModels, Mesh[]> = new Map();
  pantsMeshes: Map<AvatarPantsModels, Mesh[]> = new Map();
  shoesMeshes: Map<AvatarShoesModels, Mesh[]> = new Map();

  currentAvatarConfig: Observable<AvatarConfigTO> =
    new Observable<AvatarConfigTO>();
  avatarConfigDiff: Observable<Partial<AvatarConfigTO>> = new Observable<
    Partial<AvatarConfigTO>
  >();
}
