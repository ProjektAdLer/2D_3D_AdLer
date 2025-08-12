import { AnimationGroup, Mesh, Vector3 } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";
import IDoorLogic from "./DoorLogic/IDoorLogic";

export default class DoorViewModel {
  //constants
  public readonly iconYOffset: number = 3;
  public readonly iconScaleUpOnHover: number = 1.05;

  //meshes
  public meshes: Mesh[];
  public iconMeshes: Mesh[];

  // animations
  public doorAnimations: AnimationGroup[];
  public iconFloatingAnimation: AnimationGroup;

  // logic
  public doorLogic: IDoorLogic;

  //door properties
  public position: Vector3;
  public rotation: number;
  public theme: ThemeType;
  public isOpen: Observable<boolean> = new Observable<boolean>(false);
  public isInteractable: Observable<boolean> = new Observable<boolean>(false);
  public isExit: boolean;
  public spaceID: ComponentID;
  public isInputEnabled: Observable<boolean> = new Observable<boolean>(true);
  public isSpecialFocused: boolean = false;
}
