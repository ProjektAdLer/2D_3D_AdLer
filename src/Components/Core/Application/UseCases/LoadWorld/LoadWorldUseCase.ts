import { type getWorldDataParams } from "../../../Adapters/BackendAdapter/IBackendAdapter";
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
import type ILoadAvatarUseCase from "../LoadAvatar/ILoadAvatarUseCase";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import type IUIPort from "../../../Ports/UIPort/IUIPort";
import WorldTO from "../../DataTransferObjects/WorldTO";
import ElementTO from "../../DataTransferObjects/ElementTO";
import { Semaphore } from "src/Lib/Somaphore";
import WorldStatusTO from "../../DataTransferObjects/WorldStatusTO";

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
    @inject(USECASE_TYPES.ILoadAvatarUseCase)
    private loadAvatarUseCase: ILoadAvatarUseCase
  ) {}

  private usedWorldId: number;

  private semaphore = new Semaphore("LoadWorld in Use", 1);

  async executeAsync(): Promise<WorldTO> {
    const lock = await this.semaphore.acquire();

    const userData = this.container.getEntitiesOfType(UserDataEntity);

    if (userData.length === 0 || userData[0]?.isLoggedIn === false) {
      this.uiPort.displayNotification("User is not logged in!", "error");
      return Promise.reject("User is not logged in");
    }

    let worldEntitys = this.container.getEntitiesOfType(WorldEntity);

    let worldEntity = worldEntitys[0];

    if (!worldEntity) {
      worldEntity = await this.load(userData[0]);
    }

    this.worldPort.presentWorld(this.toTO(worldEntity));
    // TODO: Move this outside of this use case - PG
    await this.loadAvatarUseCase.executeAsync();

    lock.release();
    return Promise.resolve(this.toTO(worldEntity));
  }

  private async load(userData: UserDataEntity): Promise<WorldEntity> {
    const coursesList = await this.backendAdapter.getCoursesAvailableForUser(
      userData.userToken
    );

    this.usedWorldId = coursesList.courses[0].courseId;

    let apiWorldData = {
      userToken: userData.userToken,
      worldId: this.usedWorldId, // TODO: This can be a random number for now
    } as getWorldDataParams;

    const apiWorldDataResponse = await this.backendAdapter.getWorldData(
      apiWorldData
    );
    const apiWorldScoreResponse = await this.backendAdapter.getWorldStatus(
      userData.userToken,
      this.usedWorldId
    );

    // create learning room entities with learning element entities
    const spaceEntities: SpaceEntity[] = [];
    apiWorldDataResponse.spaces?.forEach((space) => {
      let elementEntities: ElementEntity[] = [];
      space.elements?.forEach((element) => {
        elementEntities.push(this.mapElement(element, apiWorldScoreResponse));
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
            requiredPoints: space.requiredPoints,
          },
          SpaceEntity
        )
      );
    });

    // create learning world entity
    const worldEntity = this.container.createEntity<WorldEntity>(
      {
        worldName: apiWorldDataResponse.worldName,
        spaces: spaceEntities,
        worldGoal: apiWorldDataResponse.worldGoal,
        worldID: this.usedWorldId,
      },
      WorldEntity
    );

    return worldEntity;
  }

  private mapElement = (
    element: ElementTO,
    worldStatus: WorldStatusTO
  ): ElementEntity => {
    const entityToStore: ElementEntity = {
      id: element.id,
      description: element.description,
      goals: element.goals,
      name: element.name,
      type: element.type,
      value: element.value || 0,
      parentSpaceId: element.parentSpaceId,
      hasScored:
        worldStatus.learningElements.find((e) => e.elementId === element.id)
          ?.successss || false,
    };

    return this.container.createEntity<ElementEntity>(
      entityToStore,
      ElementEntity
    );
  };

  private toTO(entityToConvert: WorldEntity): WorldTO {
    // spread to prevent passing a reference
    // this will need to be changed when entity and TO are not matching in structure anymore
    return {
      description: entityToConvert.description,
      goals: entityToConvert.goals,
      worldGoal: entityToConvert.worldGoal,
      worldName: entityToConvert.worldName,
      spaces: entityToConvert.spaces,
    } as WorldTO;
  }
}
