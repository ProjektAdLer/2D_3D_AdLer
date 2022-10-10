import { IAsyncUsecase } from "./../../Abstract/IAsyncUsecase";
export default interface IGetElementSourceUseCase
  extends IAsyncUsecase<
    {
      elementId: number;
      courseId: number;
    },
    string
  > {}
