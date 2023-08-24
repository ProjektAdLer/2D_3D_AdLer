import { Mesh, Vector3 } from "@babylonjs/core";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";

export default class WindowViewModel {
  public meshes: Mesh[];
  public theme: LearningSpaceThemeType;
  public position: Vector3;
  public rotation: number;
}
