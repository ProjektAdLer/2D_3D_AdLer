import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface IDebugUseCase extends IAsyncUsecase<void, void> {
  /**
   * Log user into Moodle
   */
  executeAsync(): Promise<void>;
}
