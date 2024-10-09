import { IInternalSynchronousUsecase } from "src/Components/Core/Application/Abstract/IInternalSynchronousUsecase";
import IStartOverallTimeSpentTimerUseCase from "../StartOverallTimeSpentTimer/IStartOverallTimeSpentTimerUseCase";

export default interface IPauseOverallTimeSpentTimerUseCase
  extends IInternalSynchronousUsecase<
    IStartOverallTimeSpentTimerUseCase,
    void
  > {}
