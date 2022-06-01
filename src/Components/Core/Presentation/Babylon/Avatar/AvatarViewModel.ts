import { IAgentParameters, Mesh } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";

export default class AvatarViewModel {
  public meshes = new Observable<Mesh[]>([]);

  public agentIndex: number;
  public agentParams: IAgentParameters = {
    radius: 0.1,
    height: 0.2,
    maxAcceleration: 4.0,
    maxSpeed: 1.0,
    collisionQueryRange: 0.5,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0,
  };
}
