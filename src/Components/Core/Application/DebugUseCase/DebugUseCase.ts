import { inject, injectable } from "inversify";
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
  executeAsync(data?: IDTO | undefined): Promise<void> {
    console.log("Debug: Automaticly loggin in User from environement variable");
    return this.loginUsecase.executeAsync({
      username: process.env.REACT_APP_DEBUG_USERNAME,
      password: process.env.REACT_APP_DEBUG_PASSWORD,
    });
  }
}
