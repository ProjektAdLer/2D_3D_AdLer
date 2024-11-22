import { Mesh } from "@babylonjs/core";
import AvatarConfigTO from "src/Components/Core/Application/DataTransferObjects/AvatarConfigTO";
import Observable from "src/Lib/Observable";

export default class AvatarEditorPreviewModelViewModel {
  baseModelMeshes: Mesh[];

  avatarConfig: Observable<AvatarConfigTO> = new Observable<AvatarConfigTO>();
}
