import { injectable } from "inversify";
import {
  AbstractMesh,
  ICrowd,
  INavMeshParameters,
  RecastJSPlugin,
  Scene,
} from "@babylonjs/core";

@injectable()
export default class SceneViewModel {
  public scene: Scene;

  public navigationMeshes: AbstractMesh[] = [];
}
