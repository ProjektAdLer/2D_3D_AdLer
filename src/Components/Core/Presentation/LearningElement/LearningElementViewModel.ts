import { Mesh } from "@babylonjs/core";
import { injectable } from "inversify";

@injectable()
export default class LearningElementViewModel {
  private meshes: Mesh[];

  get Meshes(): Mesh[] {
    if (this.meshes === undefined) throw new Error("mesh undefined!");
    return this.meshes;
  }

  set Meshes(newMeshes: Mesh[]) {
    this.meshes = newMeshes;
  }
}
