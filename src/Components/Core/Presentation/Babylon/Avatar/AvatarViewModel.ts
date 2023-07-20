import {
  AnimationGroup,
  IAgentParameters,
  Mesh,
  Nullable,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import Observable from "src/Lib/Observable";

export default class AvatarViewModel {
  public meshes: Mesh[];

  // transform
  public parentNode: TransformNode;
  public spawnPoint: Vector3 = Vector3.Zero();

  // animations
  public idleAnimation: AnimationGroup;
  public walkAnimation: AnimationGroup;

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
    reachRadius: 0.2, // acts as stopping distance stopping distance
  };
  public readonly pointerMovementThreshold: number = 0.3;
  public movementTarget: Observable<Nullable<Vector3>> = new Observable<
    Nullable<Vector3>
  >(null);
}
