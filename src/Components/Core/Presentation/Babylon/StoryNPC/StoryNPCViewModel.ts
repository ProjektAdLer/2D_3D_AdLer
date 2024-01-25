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
  characterNavigator: ICharacterNavigator;
  characterAnimator: ICharacterAnimator;
  modelType: LearningElementModel;
  modelMeshes: Mesh[];
  iconMeshes: Mesh[];
  parentNode: TransformNode;
  storyType: StoryElementType;
  isInCutScene: Observable<boolean>;
  //outroCutSceneAlreadyPlayed: boolean = false;
  idleTimer: NodeJS.Timeout;

  storyElementPresenter: IStoryElementPresenter =
    CoreDIContainer.get<IStoryElementPresenter>(
      PRESENTATION_TYPES.IStoryElementPresenter
    );

  readonly spawnPositionOffset: Vector3 = new Vector3(0, 0, 6);
  readonly cutSceneDistanceFromAvatar: number = 1.5;

  avatarPosition: Vector3 = new Vector3(0, 0, 0);

  public learningSpaceTemplateType: LearningSpaceTemplateType;

  readonly iconYOffset: number = 2.3;
  readonly movementRange: number = 5; // in m
  readonly minMovementDistance: number = 2; // in m
  readonly idleTime: number = 4000; // in ms
  readonly introCutSceneDelay: number = 3000; // in ms

  public isInteractable = new Observable<boolean>(false);
}
