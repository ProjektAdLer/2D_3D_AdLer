import { inject, injectable } from "inversify";
import type IBackendAdapter from "src/Components/Core/Adapters/BackendAdapter/IBackendAdapter";
import SpaceEntity from "src/Components/Core/Domain/Entities/SpaceEntity";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type IElementPort from "src/Components/Core/Ports/ElementPort/IElementPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ICalculateSpaceScoreUseCase from "../CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import IScoreH5PElement, { XAPiEvent } from "./IScoreH5PElement";

@injectable()
export default class ScoreH5PElement implements IScoreH5PElement {
  constructor(
    @inject(CORE_TYPES.IBackendAdapter) private backendAdapter: IBackendAdapter,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(PORT_TYPES.IElementPort) private elementPort: IElementPort,
    @inject(USECASE_TYPES.ICalculateSpaceScore)
    private calculateSpaceScoreUseCase: ICalculateSpaceScoreUseCase
  ) {}
  async executeAsync(data?: {
    xapiData: XAPiEvent;
    elementId: number;
  }): Promise<boolean> {
    const userEntity = this.container.getEntitiesOfType(UserDataEntity)[0];
    const backendResponse = await this.backendAdapter.scoreH5PElement({
      userToken: userEntity.userToken,
      h5pId: data!.elementId,
      courseId: 1, // TODOPG: get course id
      rawH5PEvent: data!.xapiData,
    });

    const space = this.container.filterEntitiesOfType<SpaceEntity>(
      SpaceEntity,
      (space) =>
        space?.elements?.some((element) => element.id === data!.elementId)
    )[0];

    if (!space)
      throw new Error(`Could not find space with element ${data?.elementId}`);

    this.calculateSpaceScoreUseCase.execute({
      spaceId: space.id,
    });

    this.elementPort.onElementScored(true, data!.elementId);

    return Promise.resolve(true);
  }
}
