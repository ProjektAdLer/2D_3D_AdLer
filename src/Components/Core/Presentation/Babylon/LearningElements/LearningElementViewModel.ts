import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { Mesh, Vector3 } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";
import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";
import { LearningElementModel } from "src/Components/Core/Domain/Types/LearningElementModelTypes";

export default class LearningElementViewModel {
  // constants
  public readonly iconScaleUpOnHover: number = 1.007;
  public readonly iconYOffset: number = 2.3;

  // meshes
  public modelMeshes: Mesh[];
  public iconMeshes: Mesh[];

  // element properties
  public id: ComponentID;
  public position: Vector3;
  public rotation: number;
  public name: string;
  public type: LearningElementTypeStrings;
  public description: string;
  public goals: string[];
  public value: number;
  public modelType: LearningElementModel;

  // runtime properties
  public hasScored = new Observable<boolean>();
}
