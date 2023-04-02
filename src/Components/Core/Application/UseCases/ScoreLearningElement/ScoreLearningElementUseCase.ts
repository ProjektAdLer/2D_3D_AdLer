import { inject, injectable } from "inversify";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import IScoreLearningElementUseCase from "./IScoreLearningElementUseCase";
import type IBackendPort from "../../Ports/Interfaces/IBackendPort";
import LearningElementEntity from "../../../Domain/Entities/LearningElementEntity";
import LearningSpaceEntity from "../../../Domain/Entities/LearningSpaceEntity";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { logger } from "../../../../../Lib/Logger";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import type ICalculateLearningWorldScoreUseCase from "../CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";

@injectable()
export default class ScoreLearningElementUseCase
  implements IScoreLearningElementUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
    @inject(USECASE_TYPES.ICalculateLearningWorldScoreUseCase)
    private calculateWorldScoreUseCase: ICalculateLearningWorldScoreUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
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

    const elements =
      this.entityContainer.filterEntitiesOfType<LearningElementEntity>(
        LearningElementEntity,
        (entity) =>
          entity.parentWorldID === userLocation.worldID &&
          entity.id === elementID
      );

    if (elements.length === 0)
      return this.rejectWithWarning("No matching element found!", elementID);
    else if (elements.length > 1)
      return this.rejectWithWarning(
        "More than one matching element found!",
        elementID
      );

    const space =
      this.entityContainer.filterEntitiesOfType<LearningSpaceEntity>(
        LearningSpaceEntity,
        (space) => space?.elements?.includes(elements[0])
      )[0];

    if (!space)
      return this.rejectWithWarning("No matching space found!", elementID);

    elements[0].hasScored = true;

    this.calculateWorldScoreUseCase.execute();

    this.worldPort.onLearningElementScored(true, elementID);
  }

  private rejectWithWarning(message: string, id?: ComponentID): Promise<void> {
    logger.warn(`Tried scoring H5P learning element with ID ${id}. ` + message);
    return Promise.reject(message);
  }
}
