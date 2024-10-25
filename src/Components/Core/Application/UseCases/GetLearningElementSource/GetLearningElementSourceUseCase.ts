import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type IBackendPort from "src/Components/Core/Application/Ports/Interfaces/IBackendPort";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetLearningElementSourceUseCase from "./IGetLearningElementSourceUseCase";
import { inject, injectable } from "inversify";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
@injectable()
export default class GetLearningElementSourceUseCase
  implements IGetLearningElementSourceUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backend: IBackendPort,
  ) {}

  async internalExecuteAsync(data: {
    elementID: number;
    worldID: number;
  }): Promise<string> {
    const token =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        .userToken;

    try {
      const resp = await this.backend.getElementSource({
        userToken: token,
        elementID: data.elementID,
        worldID: data.worldID,
      });
      this.logger.log(
        LogLevelTypes.TRACE,
        `GetLearningElementSourceUseCase: Got source for element ${data.elementID} in world ${data.worldID}`,
      );
      return resp;
    } catch (error) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `GetLearningElementSourceUseCase: Backend encountered error for element ${data.elementID} in world ${data.worldID}!`,
      );
      throw error;
    }
  }
}
