import { inject, injectable } from "inversify";
import type IBackendPort from "../../Ports/Interfaces/IBackendPort";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ElementEntity from "../../../Domain/Entities/ElementEntity";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";
import WorldEntity from "../../../Domain/Entities/WorldEntity";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import type IWorldPort from "../../Ports/Interfaces/IWorldPort";
import ILoadWorldUseCase from "./ILoadWorldUseCase";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import type IUIPort from "../../Ports/Interfaces/IUIPort";
import WorldTO from "../../DataTransferObjects/WorldTO";
import ElementTO from "../../DataTransferObjects/ElementTO";
import { Semaphore } from "src/Lib/Semaphore";
import BackendWorldStatusTO from "../../DataTransferObjects/BackendWorldStatusTO";
import { logger } from "src/Lib/Logger";
import type ISetUserLocationUseCase from "../SetUserLocation/ISetUserLocationUseCase";
import type { IInternalCalculateSpaceScoreUseCase } from "../CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import BackendWorldTO from "../../DataTransferObjects/BackendWorldTO";

@injectable()
export default class LoadWorldUseCase implements ILoadWorldUseCase {
  constructor(
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
    @inject(PORT_TYPES.IUIPort)
    private uiPort: IUIPort,
    @inject(USECASE_TYPES.ICalculateSpaceScoreUseCase)
    private calculateSpaceScore: IInternalCalculateSpaceScoreUseCase,
    @inject(USECASE_TYPES.ISetUserLocationUseCase)
    private setUserLocationUseCase: ISetUserLocationUseCase
  ) {}

  private semaphore = new Semaphore("LoadWorld in Use", 1);

  async executeAsync(data: { worldID: number }): Promise<void> {
    const lock = await this.semaphore.acquire();

    // check if user is logged in
    const userData = this.container.getEntitiesOfType(UserDataEntity);
    if (userData.length === 0 || userData[0]?.isLoggedIn === false) {
      this.uiPort.displayNotification("User is not logged in!", "error");
      logger.error("User is not logged in!");
      return Promise.reject("User is not logged in");
    }

    // check if world is available to user
    if (
      userData[0].availableWorlds.find(
        (world) => world.worldID === data.worldID
      ) === undefined
    ) {
      this.uiPort.displayNotification("World is not available!", "error");
      logger.error("World is not available!");
      return Promise.reject("World is not available");
    }

    // search for world entity with given ID in all world entities
    let worldEntity = this.container.filterEntitiesOfType(
      WorldEntity,
      (WorldEntity) => WorldEntity.id === data.worldID
    )[0];

    // if world entity does not exist, load it from backend
    if (!worldEntity) {
      worldEntity = await this.loadWorld(userData[0].userToken, data.worldID);
    }

    let worldTO = this.createWorldTOFromWorldEntity(worldEntity);

    // cumulate element scores for each space
    worldTO.spaces.forEach((space) => {
      let spaceScores = this.calculateSpaceScore.internalExecute(space.id);
      space.currentScore = spaceScores.currentScore;
      space.maxScore = spaceScores.maxScore;
    });

    // set user location
    this.setUserLocationUseCase.execute({ worldID: data.worldID });

    this.worldPort.onWorldLoaded(worldTO);

    lock.release();
  }

  private async loadWorld(
    userToken: string,
    worldID: number
  ): Promise<WorldEntity> {
    const [apiWorldDataResponse, apiWorldScoreResponse] =
      await this.loadWorldDataFromBackend(userToken, worldID);

    const spaceEntities: SpaceEntity[] = this.createSpaceEntities(
      worldID,
      apiWorldDataResponse,
      apiWorldScoreResponse
    );

    const worldEntity = this.createWorldEntity(
      worldID,
      spaceEntities,
      apiWorldDataResponse
    );

    return worldEntity;
  }

  private async loadWorldDataFromBackend(
    userToken: string,
    worldID: ComponentID
  ): Promise<[Partial<BackendWorldTO>, BackendWorldStatusTO]> {
    const [apiWorldDataResponse, apiWorldScoreResponse] = await Promise.all([
      this.backendAdapter.getWorldData({
        userToken: userToken,
        worldID: worldID,
      }),
      this.backendAdapter.getWorldStatus(userToken, worldID),
    ]);

    return [apiWorldDataResponse, apiWorldScoreResponse];
  }

  private createSpaceEntities(
    worldID: number,
    apiWorldDataResponse: Partial<BackendWorldTO>,
    apiWorldScoreResponse: BackendWorldStatusTO
  ): SpaceEntity[] {
    const spaceEntities: SpaceEntity[] = [];

    apiWorldDataResponse.spaces?.forEach((space) => {
      const elementEntities: ElementEntity[] = space.elements
        ? this.createElementEntities(
            worldID,
            space.elements,
            apiWorldScoreResponse
          )
        : [];

      spaceEntities.push(
        this.container.createEntity<SpaceEntity>(
          {
            id: space.id,
            name: space.name,
            elements: elementEntities,
            description: space.description,
            goals: space.goals,
            requirements: space.requirements,
            requiredScore: space.requiredScore,
            parentWorldID: worldID,
          },
          SpaceEntity
        )
      );
    });

    return spaceEntities;
  }

  private createElementEntities = (
    worldID: number,
    elements: ElementTO[],
    worldStatus: BackendWorldStatusTO
  ): ElementEntity[] => {
    const elementEntities: ElementEntity[] = [];

    elements.forEach((element) => {
      const newElementEntity: ElementEntity = {
        id: element.id,
        description: element.description,
        goals: element.goals,
        name: element.name,
        type: element.type,
        value: element.value || 0,
        parentSpaceID: element.parentSpaceID,
        hasScored:
          worldStatus.elements.find((e) => e.elementId === element.id)
            ?.success || false,
        parentWorldID: worldID,
      };

      elementEntities.push(
        this.container.createEntity<ElementEntity>(
          newElementEntity,
          ElementEntity
        )
      );
    });

    return elementEntities;
  };

  private createWorldEntity(
    worldID: number,
    spaceEntities: SpaceEntity[],
    apiWorldDataResponse: Partial<BackendWorldTO>
  ): WorldEntity {
    const worldEntity = this.container.createEntity<WorldEntity>(
      {
        name: apiWorldDataResponse.worldName,
        spaces: spaceEntities,
        goal: apiWorldDataResponse.worldGoal,
        id: worldID,
        description: apiWorldDataResponse.description,
      },
      WorldEntity
    );

    return worldEntity;
  }

  private createWorldTOFromWorldEntity(entityToConvert: WorldEntity): WorldTO {
    // this will need to be changed when entity and TO are not matching in structure anymore
    let worldTO = new WorldTO();
    worldTO = Object.assign(worldTO, structuredClone(entityToConvert));

    return worldTO;
  }
}
