import { Mesh } from "@babylonjs/core";
import { injectable } from "inversify";

@injectable()
export default class LearningElementViewModel {
  private mesh: Mesh[];

  get Meshes(): Mesh[] {
    return this.mesh;
  }

  set Meshes(newMeshes: Mesh[]) {
    if (newMeshes === undefined) throw new Error("newMesh undefined!");
    this.mesh = newMeshes;
  }
}
