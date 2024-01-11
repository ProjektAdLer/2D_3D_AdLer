import { INavMeshParameters } from "@babylonjs/core";
import { injectable } from "inversify";

@injectable()
export default class NavigationConfiguration {
  public navmeshParameters: INavMeshParameters = {
    cs: 0.2,
    ch: 0.2,
    walkableSlopeAngle: 90,
    walkableHeight: 1.0,
    walkableClimb: 1,
    walkableRadius: 3,
    maxEdgeLen: 12,
    maxSimplificationError: 1.3,
    minRegionArea: 8,
    mergeRegionArea: 20,
    maxVertsPerPoly: 6,
    detailSampleDist: 6,
    detailSampleMaxError: 1,
  };
  public maxAgentCount: number = 3;
  public maxAgentRadius: number = 1;
}
