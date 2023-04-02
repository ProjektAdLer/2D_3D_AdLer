import { IInternalAsyncUsecase } from "../../Abstract/IInternalAsyncUsecase";

export default interface IGetLearningElementSourceUseCase
  extends IInternalAsyncUsecase<
    {
      elementID: number;
      worldID: number;
    },
    string
  > {}
