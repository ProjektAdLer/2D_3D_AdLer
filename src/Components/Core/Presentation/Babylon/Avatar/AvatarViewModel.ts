import { IAgentParameters, Mesh, TransformNode } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";

export default class AvatarViewModel {
  public meshes = new Observable<Mesh[]>([]);
  public parentNode = new Observable<TransformNode>();

  public agentIndex: number;
  public agentParams: IAgentParameters = {
    radius: 0.5,
    height: 1,
    maxAcceleration: 5.0,
    maxSpeed: 3.0,
    collisionQueryRange: 0.5,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0,
    reachRadius: 1.0,
  };
}
