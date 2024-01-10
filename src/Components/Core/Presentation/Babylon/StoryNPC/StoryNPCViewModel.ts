import { Mesh, TransformNode } from "@babylonjs/core";
import { LearningElementModel } from "../../../Domain/LearningElementModels/LearningElementModelTypes";
import ICharacterNavigator from "../CharacterNavigator/ICharacterNavigator";
import ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";
import Observable from "../../../../../Lib/Observable";

export default class StoryNPCViewModel {
  readonly iconYOffset: number = 2.3;
  characterNavigator: ICharacterNavigator;
  characterAnimator: ICharacterAnimator;

  readonly movementRange: number = 4; // in m
  readonly minMovementDistance: number = 1; // in m
  readonly idleTime: number = 4000; // in ms

  modelType: LearningElementModel;
  modelMeshes: Mesh[];
  iconMeshes: Mesh[];
  parentNode: TransformNode;

  public isInteractable = new Observable<boolean>(false, true);
}
