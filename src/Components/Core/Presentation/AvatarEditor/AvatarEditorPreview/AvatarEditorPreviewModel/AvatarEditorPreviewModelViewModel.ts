import { Mesh, TransformNode } from "@babylonjs/core";
import AvatarConfigTO from "../../../../../Core/Application/DataTransferObjects/AvatarConfigTO";
import {
  AvatarBeardModels,
  AvatarHairModels,
} from "../../../../../Core/Domain/AvatarModels/AvatarModelTypes";
import Observable from "../../../../../../Lib/Observable";

export default class AvatarEditorPreviewModelViewModel {
  baseModelMeshes: Mesh[];

  // anchor nodes
  hairAnchorNode: TransformNode;
  beardAnchorNode: TransformNode;

  // mesh maps
  hairMeshes: Map<AvatarHairModels, Mesh[]> = new Map();
  beardMeshes: Map<AvatarBeardModels, Mesh[]> = new Map();

  currentAvatarConfig: Observable<AvatarConfigTO> =
    new Observable<AvatarConfigTO>();
  avatarConfigDiff: Observable<Partial<AvatarConfigTO>> = new Observable<
    Partial<AvatarConfigTO>
  >();
}
