import { type tempApiInfo } from "../../../Adapters/BackendAdapter/IBackendAdapter";
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
import H5PElementData from "../../../Domain/Entities/ElementData/H5PElementData";
import TextElementData from "../../../Domain/Entities/ElementData/TextElementData";
import VideoElementData from "../../../Domain/Entities/ElementData/VideoElementData";
import ImageElementData from "../../../Domain/Entities/ElementData/ImageElementData";
import type IUIPort from "../../../Ports/UIPort/IUIPort";
import WorldTO from "../../DataTransportObjects/WorldTO";
import ElementTO from "../../DataTransportObjects/ElementTO";

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

  async executeAsync(): Promise<WorldTO> {
    const userData = this.container.getEntitiesOfType(UserDataEntity);

    if (userData.length === 0 || userData[0]?.isLoggedIn === false) {
      this.uiPort.displayModal("User is not logged in!", "error");
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

    let apiData = {
      userToken: userData.userToken,
      worldId: coursesList.courses[0].courseId, // TODO: This can be a random number for now
    } as tempApiInfo;

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
      },
      WorldEntity
    );

    return worldEntity;
  }

  private mapElement = (element: ElementTO): ElementEntity => {
    const entityToStore: Partial<ElementEntity> = {
      id: element.id,
      value: element.value,
      requirements: element.requirements ?? [],
      name: element.name,
    };

    switch (element.elementData.type) {
      case "text":
        entityToStore.elementData = {
          type: "text",
        } as TextElementData;
        break;
      case "image":
        entityToStore.elementData = {
          type: "image",
        } as ImageElementData;
        break;
      case "video":
        entityToStore.elementData = {
          type: "video",
        } as VideoElementData;
        break;
      case "h5p":
        let h5pElementData = element.elementData as H5PElementData;
        entityToStore.elementData = {
          type: "h5p",
          fileName: h5pElementData.fileName,
          contextId: h5pElementData.contextId,
        } as H5PElementData;
    }

    return this.container.createEntity<ElementEntity>(
      entityToStore,
      ElementEntity
    );
  };

  private toTO(entityToConvert: WorldEntity): WorldTO {
    // spread to prevent passing a reference
    // this will need to be changed when entity and TO are not matching in structure anymore
    return structuredClone(entityToConvert) as WorldTO;
  }
}
