import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type IBackendAdapter from "src/Components/Core/Adapters/BackendAdapter/IBackendAdapter";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetElementSourceUseCase from "./IGetElementSourceUseCase";
import { inject, injectable } from "inversify";

@injectable()
export default class GetElementSourceUseCase
  implements IGetElementSourceUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backend: IBackendAdapter
  ) {}

  async executeAsync(data: {
    elementId: number;
    courseId: number;
  }): Promise<string> {
    const token =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        .userToken;

    const resp = await this.backend.getElementSource(
      token,
      data.elementId,
      data.courseId // TODOPG: get CourrseID from somewhere
    );

    return resp;
  }
}