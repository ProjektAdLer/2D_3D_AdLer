import { inject, injectable } from "inversify";
import type IBackendAdapter from "../../../Adapters/BackendAdapter/IBackendAdapter";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ElementEntity from "../../../Domain/Entities/ElementEntity";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";
import WorldEntity from "../../../Domain/Entities/WorldEntity";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import type IWorldPort from "../../../Ports/WorldPort/IWorldPort";
import ILoadWorldUseCase from "./ILoadWorldUseCase";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import type IUIPort from "../../../Ports/UIPort/IUIPort";
import WorldTO from "../../DataTransferObjects/WorldTO";
import ElementTO from "../../DataTransferObjects/ElementTO";
import { Semaphore } from "src/Lib/Semaphore";
import BackendWorldStatusTO from "../../DataTransferObjects/BackendWorldStatusTO";
import type ICalculateSpaceScoreUseCase from "../CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import { logger } from "src/Lib/Logger";
import type ISetCurrentUserLocationUseCase from "../SetCurrentUserLocation/ISetCurrentUserLocationUseCase";

@injectable()
export default class LoadWorldUseCase implements ILoadWorldUseCase {
  constructor(
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendAdapter,
    @inject(PORT_TYPES.IUIPort)
    private uiPort: IUIPort,
    @inject(USECASE_TYPES.ICalculateSpaceScore)
    private calculateSpaceScore: ICalculateSpaceScoreUseCase,
    @inject(USECASE_TYPES.ISetCurrentUserLocationUseCase)
    private setCurrentUserLocationUseCase: ISetCurrentUserLocationUseCase
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

    // search for world entity with given ID in all world entities
    let worldEntity = this.container.filterEntitiesOfType(
      WorldEntity,
      (WorldEntity) => WorldEntity.id === data.worldID
    )[0];

    // if world entity does not exist, load it from backend
    if (!worldEntity) {
      worldEntity = await this.loadWorldToEntity(
        userData[0].userToken,
        data.worldID
      );
    }

    let worldTO = this.createWorldTOFromWorldEntity(worldEntity);

    // cumulate element scores for each space
    worldTO.spaces.forEach((space) => {
      let spaceScores = this.calculateSpaceScore.execute(space.id);
      space.currentScore = spaceScores.currentScore;
      space.maxScore = spaceScores.maxScore;
    });

    // set user location
    this.setCurrentUserLocationUseCase.execute({ worldID: data.worldID });

    this.worldPort.onWorldLoaded(worldTO);

    lock.release();
  }

  private async loadWorldToEntity(
    userToken: string,
    worldID: number
  ): Promise<WorldEntity> {
    const apiWorldDataResponse = await this.backendAdapter.getWorldData({
      userToken: userToken,
      worldID: worldID,
    });
    const apiWorldScoreResponse = await this.backendAdapter.getWorldStatus(
      userToken,
      worldID
    );

    // create learning room entities with learning element entities
    const spaceEntities: SpaceEntity[] = [];
    apiWorldDataResponse.spaces?.forEach((space) => {
      let elementEntities: ElementEntity[] = [];
      space.elements?.forEach((element) => {
        elementEntities.push(
          this.mapElementToEntity(element, apiWorldScoreResponse)
        );
      });

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
          },
          SpaceEntity
        )
      );
    });

    // create learning world entity
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

  private mapElementToEntity = (
    element: ElementTO,
    worldStatus: BackendWorldStatusTO
  ): ElementEntity => {
    const entityToStore: ElementEntity = {
      id: element.id,
      description: element.description,
      goals: element.goals,
      name: element.name,
      type: element.type,
      value: element.value || 0,
      parentSpaceID: element.parentSpaceID,
      hasScored:
        worldStatus.learningElements.find((e) => e.elementId === element.id)
          ?.successss || false,
      parentCourseID: worldStatus.courseId,
    };

    return this.container.createEntity<ElementEntity>(
      entityToStore,
      ElementEntity
    );
  };

  private createWorldTOFromWorldEntity(entityToConvert: WorldEntity): WorldTO {
    // this will need to be changed when entity and TO are not matching in structure anymore
    let worldTO = new WorldTO();
    worldTO = Object.assign(worldTO, structuredClone(entityToConvert));
    return worldTO;
  }
}
