import { inject, injectable } from "inversify";
import AdaptivityElementProgressTO from "../../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import IGetAdaptivityElementStatusUseCase from "./IGetAdaptivityElementStatusUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";

@injectable()
export default class GetAdaptivityElementStatusUseCase
  implements IGetAdaptivityElementStatusUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort
  ) {}

  async internalExecuteAsync(
    data: AdaptivityElementProgressTO
  ): Promise<AdaptivityElementProgressTO> {
    // temporary hardcoded till backend call is available
    data.isCompleted = false;
    data.tasks.forEach((task) => {
      task.isCompleted = null;
      task.questions.forEach((question) => {
        question.isCompleted = null;
      });
    });

    return data;
  }
}
