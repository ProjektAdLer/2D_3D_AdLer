import { inject, injectable } from "inversify";
import { logger } from "../../../../Lib/Logger";
import USECASE_TYPES from "../../DependencyInjection/UseCases/USECASE_SYMBOLS";
import { IDTO } from "../Abstract/IDTO";
import type ILogUserIntoMoodleUseCase from "../LogUserIntoMoodle/ILogUserIntoMoodleUseCase";
import IDebugUseCase from "./IDebugUseCase";

@injectable()
export default class DebugUseCase implements IDebugUseCase {
  constructor(
    @inject(USECASE_TYPES.ILogUserIntoMoodleUseCase)
    private loginUsecase: ILogUserIntoMoodleUseCase
  ) {}
  async executeAsync(data?: IDTO | undefined): Promise<void> {
    logger.log("Debug: Automaticly loggin in User from environement variable");

    await this.loginUsecase.executeAsync({
      username: process.env.REACT_APP_DEBUG_USERNAME,
      password: process.env.REACT_APP_DEBUG_PASSWORD,
    });

    logger.log("Debug: User logged in");

    return Promise.resolve();
  }
}
