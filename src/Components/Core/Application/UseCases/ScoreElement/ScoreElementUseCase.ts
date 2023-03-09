import { inject, injectable } from "inversify";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import IScoreElementUseCase from "./IScoreElementUseCase";
import type IBackendAdapter from "../../../Adapters/BackendAdapter/IBackendAdapter";
import ElementEntity from "../../../Domain/Entities/ElementEntity";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { logger } from "../../../../../Lib/Logger";
import type IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";
import type ICalculateWorldScoreUseCase from "../CalculateWorldScore/ICalculateWorldScoreUseCase";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";

@injectable()
export default class ScoreElementUseCase implements IScoreElementUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendAdapter,
    @inject(USECASE_TYPES.ICalculateWorldScoreUseCase)
    private calculateWorldScoreUseCase: ICalculateWorldScoreUseCase,
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  async executeAsync(elementID: ComponentID): Promise<void> {
    // get user token
    const userEntity =
      this.entityContainer.getEntitiesOfType(UserDataEntity)[0];

    if (!userEntity || !userEntity.isLoggedIn) {
      return this.rejectWithWarning(
        "User is not logged in! Trying to score elememt " + elementID
      );
    }

    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      throw new Error(`User is not in a space!`);
    }

    // call backend
    try {
      await this.backendAdapter.scoreElement(
        userEntity.userToken,
        elementID,
        userLocation.worldID
      );
    } catch (e) {
      return this.rejectWithWarning(
        "Backend call failed with error: " + e,
        elementID
      );
    }

    const elements = this.entityContainer.filterEntitiesOfType<ElementEntity>(
      ElementEntity,
      (entity) =>
        entity.parentWorldID === userLocation.worldID && entity.id === elementID
    );

    if (elements.length === 0)
      return this.rejectWithWarning("No matching element found!", elementID);
    else if (elements.length > 1)
      return this.rejectWithWarning(
        "More than one matching element found!",
        elementID
      );

    const space = this.entityContainer.filterEntitiesOfType<SpaceEntity>(
      SpaceEntity,
      (space) => space?.elements?.includes(elements[0])
    )[0];

    if (!space)
      return this.rejectWithWarning("No matching space found!", elementID);

    elements[0].hasScored = true;

    this.calculateWorldScoreUseCase.execute();

    this.worldPort.onElementScored(true, elementID);
  }

  private rejectWithWarning(message: string, id?: ComponentID): Promise<void> {
    logger.warn(`Tried scoring H5P learning element with ID ${id}. ` + message);
    return Promise.reject(message);
  }
}
