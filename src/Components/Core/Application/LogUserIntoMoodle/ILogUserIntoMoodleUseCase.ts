import { IAsyncUsecase } from "../Abstract/IAsyncUsecase";

export default interface ILogUserIntoMoodleUseCase
  extends IAsyncUsecase<
    {
      username: string;
      password: string;
    },
    void
  > {}
