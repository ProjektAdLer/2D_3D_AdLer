import { inject, injectable } from "inversify";
import { logger } from "../../../../Lib/Logger";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../DependencyInjection/UseCases/USECASE_SYMBOLS";
import type IDebugPort from "../../Ports/DebugPort/IDebugPort";
import { IDTO } from "../Abstract/IDTO";
import type ILogUserIntoMoodleUseCase from "../LogUserIntoMoodle/ILogUserIntoMoodleUseCase";
import IDebugUseCase from "./IDebugUseCase";

@injectable()
export default class DebugUseCase implements IDebugUseCase {
  constructor(
    @inject(USECASE_TYPES.ILogUserIntoMoodleUseCase)
    private loginUsecase: ILogUserIntoMoodleUseCase,
    @inject(PORT_TYPES.IDebugPort)
    private debugPort: IDebugPort
  ) {}
  async executeAsync(data?: IDTO | undefined): Promise<void> {
    this.debugPort.addToMisc("Debug-Mode", "enabled");
    logger.log("Debug: Automaticly loggin in User from environement variable");

    await this.loginUsecase.executeAsync({
      username: process.env.REACT_APP_DEBUG_USERNAME,
      password: process.env.REACT_APP_DEBUG_PASSWORD,
    });

    logger.log("Debug: User logged in");

    return Promise.resolve();
  }
}
