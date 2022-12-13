import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface ILoginUseCase
  extends IAsyncUsecase<
    {
      username: string;
      password: string;
    },
    void
  > {}
