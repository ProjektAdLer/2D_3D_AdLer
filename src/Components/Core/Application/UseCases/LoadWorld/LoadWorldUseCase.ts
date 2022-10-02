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

  async executeAsync(): Promise<WorldTO> {
    const userData = this.container.getEntitiesOfType(UserDataEntity);

    if (userData.length === 0 || userData[0]?.isLoggedIn === false) {
      this.uiPort.displayNotification("User is not logged in!", "error");
      return Promise.reject("User is not logged in");
    }

    let worldEntity = this.container.getEntitiesOfType(WorldEntity)[0];

    if (!worldEntity) {
      worldEntity = await this.load(userData[0]);
    }

    this.worldPort.presentWorld(this.toTO(worldEntity));
    // TODO: Move this outside of this use case - PG
    await this.loadAvatarUseCase.executeAsync();

    return Promise.resolve(this.toTO(worldEntity));
  }

  private async load(userData: UserDataEntity): Promise<WorldEntity> {
    // TODO: remove hardcoded worldName when a learning world is selected

    const coursesList = await this.backendAdapter.getCoursesAvailableForUser(
      userData.userToken
    );

    this.usedWorldId = coursesList.courses[0].courseId;

    let apiData = {
      userToken: userData.userToken,
      worldId: this.usedWorldId, // TODO: This can be a random number for now
    } as getWorldDataParams;

    const response = await this.backendAdapter.getWorldData(apiData);

    // create learning room entities with learning element entities
    const spaceEntities: SpaceEntity[] = [];
    response.spaces?.forEach((space) => {
      let elementEntities: ElementEntity[] = [];
      space.elements?.forEach((element) => {
        elementEntities.push(this.mapElement(element));
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
        worldName: response.worldName,
        spaces: spaceEntities,
        worldGoal: response.worldGoal,
        worldID: this.usedWorldId,
      },
      WorldEntity
    );

    return worldEntity;
  }

  private mapElement = (element: ElementTO): ElementEntity => {
    const entityToStore: Partial<ElementEntity> = {
      id: element.id,
      description: element.description,
      goals: element.goals,
      name: element.name,
      type: element.type,
      value: element.value || 0,
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
