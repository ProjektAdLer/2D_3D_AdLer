import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { inject, injectable } from "inversify";
import type IBackendAdapter from "src/Components/Core/Application/Ports/Interfaces/IBackendPort";
import ElementEntity from "src/Components/Core/Domain/Entities/ElementEntity";
import SpaceEntity from "src/Components/Core/Domain/Entities/SpaceEntity";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import { logger } from "src/Lib/Logger";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IScoreH5PElementUseCase, { XAPiEvent } from "./IScoreH5PElementUseCase";
import type IWorldPort from "src/Components/Core/Application/Ports/Interfaces/IWorldPort";
import type { IInternalCalculateSpaceScoreUseCase } from "../CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";

@injectable()
export default class ScoreH5PElementUseCase implements IScoreH5PElementUseCase {
  constructor(
    @inject(CORE_TYPES.IBackendAdapter) private backendAdapter: IBackendAdapter,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.IWorldPort) private worldPort: IWorldPort,
    @inject(USECASE_TYPES.ICalculateSpaceScoreUseCase)
    private calculateSpaceScoreUseCase: IInternalCalculateSpaceScoreUseCase,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  async executeAsync(data: {
    xapiData: XAPiEvent;
    elementID: ComponentID;
  }): Promise<boolean> {
    if (!data.elementID || !data.xapiData) {
      return this.rejectWithWarning("data is (atleast partly) undefined!");
    }

    // get user token
    const userEntity =
      this.entityContainer.getEntitiesOfType(UserDataEntity)[0];

    if (!userEntity || !userEntity.isLoggedIn) {
      return this.rejectWithWarning("User is not logged in!");
    }

    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      throw new Error(`User is not in a space!`);
    }

    // call backend
    const scoredSuccessful = await this.backendAdapter.scoreH5PElement({
      userToken: userEntity.userToken,
      h5pID: data.elementID,
      courseID: userLocation.worldID,
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
          (space) => space?.id === userLocation.spaceID
        )[0];
      if (!space) {
        return this.rejectWithWarning("Space with given element not found!");
      }

      element.hasScored = true;

      this.calculateSpaceScoreUseCase.internalExecute(userLocation.spaceID);

      this.worldPort.onElementScored(true, data.elementID);
    }

    return Promise.resolve(scoredSuccessful);
  }

  private rejectWithWarning(message: string): Promise<boolean> {
    logger.warn("Tried scoring H5P learning element. " + message);
    return Promise.reject(message);
  }
}
