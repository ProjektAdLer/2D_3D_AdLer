import { inject, injectable } from "inversify";
import type IBackendAdapter from "src/Components/Core/Adapters/BackendAdapter/IBackendAdapter";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IScoreH5PElement, { XAPiEvent } from "./IScoreH5PElement";

@injectable()
export default class ScoreH5PElement implements IScoreH5PElement {
  constructor(
    @inject(CORE_TYPES.IBackendAdapter) private backendAdapter: IBackendAdapter,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer
  ) {}
  async executeAsync(
    data?: { xapiData: XAPiEvent } | undefined
  ): Promise<boolean> {
    const userEntity = this.container.getEntitiesOfType(UserDataEntity)[0];
    const backendResponse = await this.backendAdapter.scoreH5PElement({
      userToken: userEntity.userToken,
      email: "TestEmail",
      h5pId: 1337,
      h5pName: "TestH5P",
      rawH5PEvent: data!.xapiData,
      userName: userEntity.username,
    });
    return Promise.resolve(true);
  }
}
