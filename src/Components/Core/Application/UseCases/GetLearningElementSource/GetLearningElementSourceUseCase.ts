import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type IBackendPort from "src/Components/Core/Application/Ports/Interfaces/IBackendPort";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetLearningElementSourceUseCase from "./IGetLearningElementSourceUseCase";
import { inject, injectable } from "inversify";

@injectable()
export default class GetLearningElementSourceUseCase
  implements IGetLearningElementSourceUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backend: IBackendPort
  ) {}

  async internalExecuteAsync(data: {
    elementID: number;
    worldID: number;
  }): Promise<string> {
    const token =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        .userToken;

    const resp = await this.backend.getElementSource({
      userToken: token,
      elementID: data.elementID,
      worldID: data.worldID,
    });

    return resp;
  }
}
