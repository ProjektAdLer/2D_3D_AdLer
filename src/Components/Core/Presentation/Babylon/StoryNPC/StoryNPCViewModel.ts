import { AnimationGroup, Mesh, TransformNode, Vector3 } from "@babylonjs/core";
import { LearningElementModel } from "../../../Domain/LearningElementModels/LearningElementModelTypes";
import ICharacterNavigator from "../CharacterNavigator/ICharacterNavigator";
import ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";
import Observable from "../../../../../Lib/Observable";
import { StoryElementType } from "../../../Domain/Types/StoryElementType";
import IStoryElementPresenter from "~ReactComponents/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

export enum StoryNPCState {
  Idle,
  RandomMovement,
  WaitOnCutSceneTrigger,
  CutScene,
  Stop,
  ExitRoom,
}

export default class StoryNPCViewModel {
  storyElementPresenter: IStoryElementPresenter =
    CoreDIContainer.get<IStoryElementPresenter>(
      PRESENTATION_TYPES.IStoryElementPresenter,
    );

  // observable runtime properties
  isInteractable = new Observable<boolean>(false);
  state = new Observable(StoryNPCState.Idle);

  // non-observable runtime properties
  characterNavigator: ICharacterNavigator;
  characterAnimator: ICharacterAnimator;
  modelType: LearningElementModel;
  modelMeshes: Mesh[];
  iconMeshes: Mesh[];
  iconFloatingAnimation: AnimationGroup;
  parentNode: TransformNode;
  modelRootNode: TransformNode;
  storyType: StoryElementType;
  storyNpcName: string | null;
  exitAfterIntro: boolean | null;
  exitAfterOutro: boolean | null;
  idleTimer: NodeJS.Timeout;
  cutSceneTimer: NodeJS.Timeout;
  introIdlePosition: Vector3 = new Vector3(0, 0, 0);
  introIdlePosRotation: number = 0;
  introCutsceneSpawnPosition: Vector3 = new Vector3(0, 0, 0);
  introCutsceneRotation: number = 0;
  outroIdlePosition: Vector3 = new Vector3(0, 0, 0);
  outroIdlePosRotation: number = 0;

  // readonly configuration properties
  readonly cutSceneDistanceFromAvatar: number = 1.5;
  readonly iconYOffset: number = 2.3;
  readonly movementRange: number = 5; // in m
  readonly minMovementDistance: number = 2; // in m
  readonly idleTime: number = 7000; // in ms
  readonly cutSceneStartDelay: number = 2000; // in ms
  readonly iconScaleUpOnHover: number = 1.05;
}
