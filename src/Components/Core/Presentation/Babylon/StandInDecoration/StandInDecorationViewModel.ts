import { Mesh, Vector3 } from "@babylonjs/core";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";

export default class StandInDecorationViewModel {
  public modelMeshes: Mesh[];
  public position: Vector3;
  public rotation: number;
  public spaceName: string;
  public slotNumber: number;
  public theme: LearningSpaceThemeType;
}
