import { injectable } from "inversify";
import { AbstractMesh, Scene } from "@babylonjs/core";

@injectable()
export default class SceneViewModel {
  public scene: Scene;

  public navigationMeshes: AbstractMesh[] = [];
}
