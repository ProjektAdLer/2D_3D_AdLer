import { inject, injectable } from "inversify";
import IBackendAdapter from "src/Components/Core/Adapters/BackendAdapter/IBackendAdapter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { config } from "../../../../../config";
import { logger } from "../../../../../Lib/Logger";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import type IDebugPort from "../../../Ports/DebugPort/IDebugPort";
import type ILoginMoodleUseCase from "../LoginMoodle/ILoginMoodleUseCase";
import IDebugUseCase from "./IDebugUseCase";

@injectable()
export default class DebugUseCase implements IDebugUseCase {
  constructor(
    @inject(USECASE_TYPES.ILoginMoodleUseCase)
    private loginUsecase: ILoginMoodleUseCase,
    @inject(PORT_TYPES.IDebugPort)
    private debugPort: IDebugPort
  ) {}
  async executeAsync(): Promise<void> {
    this.debugPort.addToMisc("Debug-Mode", "enabled");
    await this.logIn();
    return Promise.resolve();
  }

  logIn = async (): Promise<void> => {
    if (!config.useAutoLogin) throw new Error("AutoLogin is disabled");
    logger.log("Debug: Automaticly loggin in User from environement variable");

    await this.loginUsecase.executeAsync({
      username: !config.useFakeBackend ? config.userName : "fakeUser",
      password: !config.useFakeBackend ? config.password : "fakePassword",
    });
    logger.log("Debug: User logged in");
  };
}