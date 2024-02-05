import { Mesh, TransformNode, Vector3 } from "@babylonjs/core";
import { LearningElementModel } from "../../../Domain/LearningElementModels/LearningElementModelTypes";
import ICharacterNavigator from "../CharacterNavigator/ICharacterNavigator";
import ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";
import Observable from "../../../../../Lib/Observable";
import { StoryElementType } from "../../../Domain/Types/StoryElementType";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import IStoryElementPresenter from "~ReactComponents/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

export default class StoryNPCViewModel {
  storyElementPresenter: IStoryElementPresenter =
    CoreDIContainer.get<IStoryElementPresenter>(
      PRESENTATION_TYPES.IStoryElementPresenter
    );

  // observable runtime properties
  isInCutScene = new Observable<boolean>(false);
  isInteractable = new Observable<boolean>(false);

  // non-observable runtime properties
  characterNavigator: ICharacterNavigator;
  characterAnimator: ICharacterAnimator;
  modelType: LearningElementModel;
  modelMeshes: Mesh[];
  iconMeshes: Mesh[];
  parentNode: TransformNode;
  modelRootNode: TransformNode;
  storyType: StoryElementType;
  idleTimer: NodeJS.Timeout;
  avatarPosition: Vector3 = new Vector3(0, 0, 0);
  learningSpaceTemplateType: LearningSpaceTemplateType;

  // readonly configuration properties
  readonly spawnPositionOffset: Vector3 = new Vector3(0, 0, 6);
  readonly cutSceneDistanceFromAvatar: number = 1.5;
  readonly iconYOffset: number = 2.3;
  readonly movementRange: number = 5; // in m
  readonly minMovementDistance: number = 2; // in m
  readonly idleTime: number = 4000; // in ms
  readonly introCutSceneDelay: number = 2000; // in ms
}
