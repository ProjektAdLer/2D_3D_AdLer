import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import IBackendAdapter from "src/Components/Core/Adapters/BackendAdapter/IBackendAdapter";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetElementSourceUseCase from "./IGetElementSourceUseCase";
import { inject, injectable } from "inversify";

@injectable()
export default class GetElementSourceUseCase
  implements IGetElementSourceUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer
  ) {}
  async executeAsync(data: {
    elementId: number;
    courseId: number;
  }): Promise<string> {
    const token =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        .userToken;

    const resp = await CoreDIContainer.get<IBackendAdapter>(
      CORE_TYPES.IBackendAdapter
    ).getElementSource(
      token,
      data.elementId,
      data.courseId // TODOPG: get CourrseID from somewhere
    );

    return resp;
  }
}
