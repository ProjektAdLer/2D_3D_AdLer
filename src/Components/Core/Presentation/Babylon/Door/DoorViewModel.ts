import { Mesh, Vector3 } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";

export default class DoorViewModel {
  public meshes: Mesh[];
  public position: Vector3;
  public rotation: number;
  public theme: LearningSpaceThemeType;
  public isOpen: Observable<boolean> = new Observable<boolean>(false);
  public isExit: boolean;
  public spaceID: ComponentID;
}
