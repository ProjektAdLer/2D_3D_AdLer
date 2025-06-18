import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { AnimationGroup, Mesh, Vector3 } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";
import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";
import { LearningElementModel } from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import { DifficultyInfo } from "src/Components/Core/Domain/Types/LearningElementDifficulty";

export default class LearningElementViewModel {
  // constants
  public readonly iconScaleUpOnHover: number = 1.05;
  public readonly iconYOffset: number = 2.5;
  public readonly highlightTimeout: number = 10000; // in ms

  // meshes
  public modelMeshes: Mesh[];
  public iconMeshes: Mesh[];

  // animations
  public iconFloatingAnimation: AnimationGroup;

  // element properties
  public id: ComponentID;
  public position: Vector3;
  public rotation: number;
  public name: string;
  public type: LearningElementTypeStrings;
  public description: string;
  public goals: string[];
  public value: number;
  public difficulty: DifficultyInfo;
  public modelType: LearningElementModel;
  public theme: LearningSpaceThemeType;

  // runtime properties
  public hasScored = new Observable<boolean>();
  public isHighlighted = new Observable<boolean>(false);
  public isInteractable = new Observable<boolean>(false, true);
}
