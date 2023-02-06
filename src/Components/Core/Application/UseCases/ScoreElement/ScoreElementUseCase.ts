import { inject, injectable } from "inversify";
import { ElementID } from "../../../Domain/Types/EntityTypes";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import IScoreElementUseCase from "./IScoreElementUseCase";
import type IBackendAdapter from "../../../Adapters/BackendAdapter/IBackendAdapter";
import type ICalculateSpaceScoreUseCase from "../CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import ElementEntity from "../../../Domain/Entities/ElementEntity";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { logger } from "../../../../../Lib/Logger";
import type IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";

@injectable()
export default class ScoreElementUseCase implements IScoreElementUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendAdapter,
    @inject(USECASE_TYPES.ICalculateSpaceScore)
    private calculateSpaceScoreUseCase: ICalculateSpaceScoreUseCase,
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort
  ) {}

  async executeAsync(data: {
    elementId: ElementID;
    courseId: ElementID;
  }): Promise<void> {
    if (!data || !data.elementId) {
      return this.rejectWithWarning("data is (atleast partly) undefined!");
    }

    // get user token
    const userEntity =
      this.entityContainer.getEntitiesOfType(UserDataEntity)[0];

    if (!userEntity || !userEntity.isLoggedIn) {
      return this.rejectWithWarning("User is not logged in!", data.elementId);
    }

    // call backend
    try {
      await this.backendAdapter.scoreElement(
        userEntity.userToken,
        data.elementId,
        data.courseId
      );
    } catch (e) {
      return this.rejectWithWarning(
        "Backend call failed with error: " + e,
        data.elementId
      );
    }

    const elements = this.entityContainer.filterEntitiesOfType<ElementEntity>(
      ElementEntity,
      (entity) => entity.id === data.elementId
    );

    if (elements.length === 0)
      return this.rejectWithWarning(
        "No matching element found!",
        data.elementId
      );
    else if (elements.length > 1)
      return this.rejectWithWarning(
        "More than one matching element found!",
        data.elementId
      );

    const space = this.entityContainer.filterEntitiesOfType<SpaceEntity>(
      SpaceEntity,
      (space) => space?.elements?.includes(elements[0])
    )[0];

    if (!space)
      return this.rejectWithWarning("No matching space found!", data.elementId);

    elements[0].hasScored = true;

    this.calculateSpaceScoreUseCase.execute(space.id);

    this.worldPort.onElementScored(true, data.elementId);
  }

  private rejectWithWarning(message: string, id?: ElementID): Promise<void> {
    logger.warn(`Tried scoring H5P learning element with ID ${id}. ` + message);
    return Promise.reject(message);
  }
}
