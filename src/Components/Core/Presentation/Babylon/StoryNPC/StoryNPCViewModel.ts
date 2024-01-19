import { Mesh, TransformNode } from "@babylonjs/core";
import { LearningElementModel } from "../../../Domain/LearningElementModels/LearningElementModelTypes";
import ICharacterNavigator from "../CharacterNavigator/ICharacterNavigator";
import ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";
import Observable from "../../../../../Lib/Observable";
import { StoryElementType } from "../../../Domain/Types/StoryElementType";

export default class StoryNPCViewModel {
  characterNavigator: ICharacterNavigator;
  characterAnimator: ICharacterAnimator;
  modelType: LearningElementModel;
  modelMeshes: Mesh[];
  iconMeshes: Mesh[];
  parentNode: TransformNode;
  storyType: StoryElementType;

  readonly iconYOffset: number = 2.3;
  readonly movementRange: number = 5; // in m
  readonly minMovementDistance: number = 2; // in m
  readonly idleTime: number = 4000; // in ms

  public isInteractable = new Observable<boolean>(false, true);
}
