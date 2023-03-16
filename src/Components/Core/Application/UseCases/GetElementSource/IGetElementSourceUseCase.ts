import { IInternalAsyncUsecase } from "../../Abstract/IInternalAsyncUsecase";

export default interface IGetElementSourceUseCase
  extends IInternalAsyncUsecase<
    {
      elementID: number;
      worldID: number;
    },
    string
  > {}
