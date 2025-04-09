import { INavMeshParameters } from "@babylonjs/core";
import { injectable } from "inversify";

@injectable()
export default class NavigationConfiguration {
  public navmeshParameters: INavMeshParameters = {
    cs: 0.1,
    ch: 0.05,
    walkableSlopeAngle: 10,
    walkableHeight: 5.0,
    walkableClimb: 0.05,
    walkableRadius: 3,
    maxEdgeLen: 3,
    maxSimplificationError: 1,
    minRegionArea: 20,
    mergeRegionArea: 0,
    maxVertsPerPoly: 6,
    detailSampleDist: 6,
    detailSampleMaxError: 1,
  };
  public maxAgentCount: number = 3;
  public maxAgentRadius: number = 1;
}
