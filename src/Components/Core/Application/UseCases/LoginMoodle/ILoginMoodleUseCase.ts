import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface ILoginMoodleUseCase
  extends IAsyncUsecase<
    {
      username: string;
      password: string;
    },
    void
  > {}
