import { injectable } from "inversify";
import {
  AbstractMesh,
  ICrowd,
  INavMeshParameters,
  RecastJSPlugin,
  Scene,
} from "@babylonjs/core";

@injectable()
export default class SceneViewModel {
  public scene: Scene;

  // navigation
  public navigation: RecastJSPlugin;
  public navigationMeshes: AbstractMesh[] = [];
  public navmeshParameters: INavMeshParameters = {
    cs: 0.2,
    ch: 0.2,
    walkableSlopeAngle: 90,
    walkableHeight: 1.0,
    walkableClimb: 1,
    walkableRadius: 1,
    maxEdgeLen: 12,
    maxSimplificationError: 1.3,
    minRegionArea: 8,
    mergeRegionArea: 20,
    maxVertsPerPoly: 6,
    detailSampleDist: 6,
    detailSampleMaxError: 1,
  };

  // navigation crowd
  public navigationCrowd: ICrowd;
  public maxAgentCount: number = 1;
  public maxAgentRadius: number = 0.1;
}
