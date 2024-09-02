import { INavMeshParameters } from "@babylonjs/core";
import { injectable } from "inversify";

@injectable()
export default class NavigationConfiguration {
  public navmeshParameters: INavMeshParameters = {
    cs: 0.2,
    ch: 0.2,
    walkableSlopeAngle: 10,
    walkableHeight: 3.0,
    walkableClimb: 0.05,
    walkableRadius: 2,
    maxEdgeLen: 5,
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
