import { IAsyncUsecase } from "./../Abstract/IAsyncUsecase";

export default interface IDebugUseCase extends IAsyncUsecase {
  /**
   * Log user into Moodle
   */
  executeAsync(): Promise<void>;
}
