import { ElementID } from "../../Domain/Types/EntityTypes";
import { ISynchronousUsecase } from "../Abstract/ISynchronousUsecase";
export default interface ICalculateSpaceScore
  extends ISynchronousUsecase<{ spaceId: ElementID }> {
  execute(data: { spaceId: ElementID }): void;
}
