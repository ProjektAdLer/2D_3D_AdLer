import { ElementID } from "../../../Domain/Types/EntityTypes";
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface IScoreElementUseCase
  extends IAsyncUsecase<
    {
      elementId: ElementID;
    },
    void
  > {}
