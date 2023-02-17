import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";
export default interface IGetElementSourceUseCase
  extends IAsyncUsecase<
    {
      elementID: number;
      courseID: number;
    },
    string
  > {}
