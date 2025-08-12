import { Mesh, Vector3 } from "@babylonjs/core";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";

export default class WindowViewModel {
  public meshes: Mesh[];
  public theme: ThemeType;
  public position: Vector3;
  public rotation: number;
}
