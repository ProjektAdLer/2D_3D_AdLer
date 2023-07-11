import {
  IAgentParameters,
  Mesh,
  TransformNode,
  Vector3,
} from "@babylonjs/core";

export default class AvatarViewModel {
  public meshes: Mesh[];

  // transform
  public parentNode: TransformNode;
  public spawnPoint: Vector3 = Vector3.Zero();

  // navigation
  public agentIndex: number;
  public readonly agentParams: IAgentParameters = {
    radius: 1,
    height: 1,
    maxAcceleration: 10.0,
    maxSpeed: 3.0,
    collisionQueryRange: 0.5,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0,
  };
  public readonly pointerMovementThreshold: number = 0.3;
  public keyMovementTarget: Vector3 = Vector3.Zero();
  public pointerMovementTarget: Vector3 = Vector3.Zero();
  public finalMovementTarget: Vector3 = Vector3.Zero();
}
