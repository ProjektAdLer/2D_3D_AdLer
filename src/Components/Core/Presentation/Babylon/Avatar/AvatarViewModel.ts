import {
  AnimationGroup,
  IAgentParameters,
  Mesh,
  Nullable,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import Observable from "src/Lib/Observable";
import { IStateMachine } from "./StateMachine";
import { Transform } from "src/Components/Core/Domain/LearningSpaceTemplates/ILearningSpaceTemplate";

export enum AvatarAnimationState {
  Idle,
  Walking,
  Interaction,
}
export enum AvatarAnimationAction {
  MovementStarted,
  TargetReached,
  InteractionStarted,
  InteractionFinished,
}

export default class AvatarViewModel {
  public meshes: Mesh[];

  // transform
  public parentNode: TransformNode;
  public spawnPoint: Transform;

  // animations
  public animationStateMachine: IStateMachine<
    AvatarAnimationState,
    AvatarAnimationAction
  >;
  public idleAnimation: AnimationGroup;
  public walkAnimation: AnimationGroup;
  public interactionAnimation: AnimationGroup;

  // navigation
  public agentIndex: number;
  public readonly agentParams: IAgentParameters = {
    radius: 1,
    height: 1,
    maxAcceleration: 5000.0,
    maxSpeed: 3.0,
    collisionQueryRange: 0.5,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0,
    reachRadius: 0.2, // acts as stopping distance
  };
  public readonly pointerMovementThreshold: number = 0.7;
  public movementTarget: Observable<Nullable<Vector3>> = new Observable<
    Nullable<Vector3>
  >(null);
}
