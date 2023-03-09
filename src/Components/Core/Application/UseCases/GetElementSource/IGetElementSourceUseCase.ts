import { IInternalAsyncUsecase } from "../../Abstract/IInternalAsyncUsecase";

export default interface IGetElementSourceUseCase
  extends IInternalAsyncUsecase<
    {
      elementID: number;
      courseID: number;
    },
    string
  > {}
