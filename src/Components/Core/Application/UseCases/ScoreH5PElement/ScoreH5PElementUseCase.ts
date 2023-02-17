import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { inject, injectable } from "inversify";
import type IBackendAdapter from "src/Components/Core/Adapters/BackendAdapter/IBackendAdapter";
import ElementEntity from "src/Components/Core/Domain/Entities/ElementEntity";
import SpaceEntity from "src/Components/Core/Domain/Entities/SpaceEntity";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import { logger } from "src/Lib/Logger";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ICalculateSpaceScoreUseCase from "../CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import IScoreH5PElementUseCase, { XAPiEvent } from "./IScoreH5PElementUseCase";
import type IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";

@injectable()
export default class ScoreH5PElementUseCase implements IScoreH5PElementUseCase {
  constructor(
    @inject(CORE_TYPES.IBackendAdapter) private backendAdapter: IBackendAdapter,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.IWorldPort) private worldPort: IWorldPort,
    @inject(USECASE_TYPES.ICalculateSpaceScore)
    private calculateSpaceScoreUseCase: ICalculateSpaceScoreUseCase
  ) {}

  async executeAsync(data?: {
    xapiData: XAPiEvent;
    elementID: ComponentID;
    courseID: ComponentID;
  }): Promise<boolean> {
    if (!data || !data.elementID || !data.xapiData) {
      return this.rejectWithWarning("data is (atleast partly) undefined!");
    }

    // get user token
    const userEntity =
      this.entityContainer.getEntitiesOfType(UserDataEntity)[0];

    if (!userEntity || !userEntity.isLoggedIn) {
      return this.rejectWithWarning("User is not logged in!");
    }

    // call backend
    const scoredSuccessful = await this.backendAdapter.scoreH5PElement({
      userToken: userEntity.userToken,
      h5pID: data.elementID,
      courseID: data.courseID,
      rawH5PEvent: data.xapiData,
    });

    // do scoring, if backend call returned successful scoring
    if (scoredSuccessful) {
      // get element
      const elements: ElementEntity[] =
        this.entityContainer.filterEntitiesOfType<ElementEntity>(
          ElementEntity,
          (entity) => {
            return entity.id === data.elementID;
          }
        );

      if (elements.length === 0)
        return this.rejectWithWarning("No matching element found!");
      else if (elements.length > 1)
        return this.rejectWithWarning("More than one matching element found!");

      const element: ElementEntity = elements[0];

      // get space
      const space: SpaceEntity =
        this.entityContainer.filterEntitiesOfType<SpaceEntity>(
          SpaceEntity,
          (space) => space?.id === element.parentSpaceID
        )[0];

      if (!space) {
        return this.rejectWithWarning("Space with given element not found!");
      }

      element.hasScored = true;

      this.calculateSpaceScoreUseCase.execute(space.id);

      this.worldPort.onElementScored(true, data.elementID);
    }

    return Promise.resolve(scoredSuccessful);
  }

  private rejectWithWarning(message: string): Promise<boolean> {
    logger.warn("Tried scoring H5P learning element. " + message);
    return Promise.reject(message);
  }
}
