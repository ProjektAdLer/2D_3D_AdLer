import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import { IAsyncUsecase } from "../Abstract/IAsyncUsecase";

export default interface IScoreLearningElementUseCase
  extends IAsyncUsecase<
    {
      learningElementId: LearningComponentID;
    },
    void
  > {}
