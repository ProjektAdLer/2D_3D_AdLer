import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import WorldEntity from "../../../Domain/Entities/WorldEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import type ILoadWorldUseCase from "../LoadWorld/ILoadWorldUseCase";
import ILoadSpaceUseCase from "./ILoadSpaceUseCase";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";
import type IWorldPort from "src/Components/Core/Application/Ports/Interfaces/IWorldPort";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import type ISetUserLocationUseCase from "../SetUserLocation/ISetUserLocationUseCase";
import type { IInternalCalculateSpaceScoreUseCase } from "src/Components/Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";

@injectable()
export default class LoadSpaceUseCase implements ILoadSpaceUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(USECASE_TYPES.ILoadWorldUseCase)
    private loadWorldUseCase: ILoadWorldUseCase,
    @inject(USECASE_TYPES.ICalculateSpaceScoreUseCase)
    private calculateSpaceScore: IInternalCalculateSpaceScoreUseCase,
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(USECASE_TYPES.ISetUserLocationUseCase)
    private setUserLocationUseCase: ISetUserLocationUseCase
  ) {}

  async executeAsync(data: {
    spaceID: ComponentID;
    worldID: ComponentID;
  }): Promise<void> {
    // try to get the world entity from the container, there should always be only one at most
    let worldEntity = this.getWorldEntity(data.worldID);

    // if the world is not loaded yet, load it via the LoadWorldUseCase
    if (!worldEntity) {
      await this.loadWorldUseCase.executeAsync({ worldID: data.worldID });
      worldEntity = this.getWorldEntity(data.worldID);
    }

    // try to find the room with a matching id
    let spaceEntity = worldEntity.spaces.find(
      (spaceEntity) => spaceEntity.id === data.spaceID
    );

    if (!spaceEntity)
      return Promise.reject("SpaceEntity with " + data.spaceID + " not found");

    // create SpaceTO and fill with scoring data
    let spaceTO = this.toTO(spaceEntity);
    const spaceScoreTO = this.calculateSpaceScore.internalExecute(spaceTO.id);
    spaceTO.currentScore = spaceScoreTO.currentScore;
    spaceTO.maxScore = spaceScoreTO.maxScore;

    // set current location in user entity
    this.setUserLocationUseCase.execute({
      worldID: data.worldID,
      spaceID: data.spaceID,
    });

    this.worldPort.onSpaceLoaded(spaceTO);
  }

  private toTO(spaceEntity: SpaceEntity): LearningSpaceTO {
    let spaceTO = new LearningSpaceTO();
    spaceTO = Object.assign(spaceTO, structuredClone(spaceEntity));
    return spaceTO;
  }

  private getWorldEntity(worldID: ComponentID): WorldEntity {
    return this.container.filterEntitiesOfType<WorldEntity>(
      WorldEntity,
      (entity) => entity.id === worldID
    )[0];
  }
}
