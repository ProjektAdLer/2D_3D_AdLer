import {
  IAgentParameters,
  Mesh,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";

export default class AvatarViewModel {
  public meshes = new Observable<Mesh[]>([]);
  public parentNode = new Observable<TransformNode>();

  public agentIndex: number;
  public agentParams: IAgentParameters = {
    radius: 0.5,
    height: 1,
    maxAcceleration: 10.0,
    maxSpeed: 3.0,
    collisionQueryRange: 0.5,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0,
  };

  public keyMovementTarget: Vector3 = Vector3.Zero();
  public pointerMovementTarget: Vector3 = Vector3.Zero();
}
