import { type tempApiInfo } from "./../../Adapters/Backend/IBackend";
import { APILearningRoomTO } from "./../../Adapters/Backend/APILearningRoomTO";
import { inject, injectable } from "inversify";
import { APILearningElementTO } from "../../Adapters/Backend/APILearningElementTO";
import type IBackend from "../../Adapters/Backend/IBackend";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningElementEntity from "../../Domain/Entities/LearningElementEntity";
import LearningRoomEntity from "../../Domain/Entities/LearningRoomEntity";
import LearningWorldEntity from "../../Domain/Entities/LearningWorldEntity";
import UserDataEntity from "../../Domain/Entities/UserDataEntity";
import type IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import type ILearningWorldPort from "./ILearningWorldPort";
import { LearningWorldTO } from "./ILearningWorldPort";
import ILoadWorldUseCase from "./ILoadWorldUseCase";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import ILoadAvatarUseCase from "../LoadAvatar/ILoadAvatarUseCase";
import USECASE_TYPES from "../../DependencyInjection/UseCases/USECASE_TYPES";
import H5PLearningElementData from "../../Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import TextLearningElementData from "../../Domain/Entities/SpecificLearningElements/TextLearningElementData";
import type IUIPort from "../../Ports/UIPort/IUIPort";

@injectable()
export default class LoadWorldUseCase implements ILoadWorldUseCase {
  private learningWorldEntity: LearningWorldEntity;

  constructor(
    @inject(PORT_TYPES.ILearningWorldPort)
    private learningWorldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackend)
    private backend: IBackend,
    @inject(PORT_TYPES.IUIPort)
    private uiPort: IUIPort
  ) {}

  async executeAsync(): Promise<void> {
    const userData = this.container.getEntitiesOfType(UserDataEntity);

    if (userData.length === 0 || userData[0]?.isLoggedIn === false) {
      this.uiPort.displayModal("User is not logged in!", "error");
      return Promise.reject("User is not logged in");
    }

    await this.load(userData[0]);

    this.learningWorldPort.presentLearningWorld(
      this.toTO(this.learningWorldEntity)
    );

    const loadAvatarUseCase = CoreDIContainer.get<ILoadAvatarUseCase>(
      USECASE_TYPES.ILoadAvatarUseCase
    );
    await loadAvatarUseCase.executeAsync();

    return Promise.resolve();
  }

  private toTO(entityToConvert: LearningWorldEntity): LearningWorldTO {
    return {
      learningRooms: entityToConvert.learningRooms,
      worldName: entityToConvert.worldName,
    };
  }

  private mapLearningElement = (
    element: APILearningElementTO
  ): LearningElementEntity => {
    const entityToStore: Partial<LearningElementEntity> = {
      id: element.id,
      value: element.value[0].value,
      requirement: element.requirements[0]?.value,
      name: element.name,
    };

    switch (element.elementType) {
      case "text":
        entityToStore.learningElementData = {
          type: "text",
        } as TextLearningElementData;
        break;
      case "image":
        entityToStore.learningElementData = {
          type: "image",
        } as TextLearningElementData;
        break;
      case "video":
        entityToStore.learningElementData = {
          type: "video",
        } as TextLearningElementData;
        break;
      case "h5p":
        entityToStore.learningElementData = {
          type: "h5p",
          fileName: element.metaData.find(
            (metaData) => metaData.key === "h5pFileName"
          )?.value,
          contextId: Number.parseInt(
            element.metaData.find((metaData) => metaData.key === "h5pContextId")
              ?.value || "0"
          ),
        } as H5PLearningElementData;
    }

    return this.container.createEntity<LearningElementEntity>(
      entityToStore,
      LearningElementEntity
    );
  };

  private async load(userData: UserDataEntity): Promise<void> {
    const worldName = "Lernwelt Autorentool";

    let apiData = {
      userToken: userData.userToken,
      worldName: worldName,
    } as tempApiInfo;

    const worldResp = await this.backend.getWorld(apiData);

    const learningRoomResp = (await this.backend.getLearningRooms(
      apiData
    )) as APILearningRoomTO[];

    const learningElementResp = (await this.backend.getLearningElements(
      apiData
    )) as APILearningElementTO[];

    if (this.container.getEntitiesOfType(LearningWorldEntity).length === 0) {
      // Learning Elements
      const learningElementEntities: LearningElementEntity[] = [];
      learningElementResp.forEach((element) => {
        learningElementEntities.push(this.mapLearningElement(element));
      });

      // Learning Room
      let roomEntity = this.container.createEntity<LearningRoomEntity>(
        {
          id: learningRoomResp[0].id,
          learningElements: learningElementEntities,
        },
        LearningRoomEntity
      );
      // Learning World
      this.learningWorldEntity =
        this.container.createEntity<LearningWorldEntity>(
          {
            worldName: worldResp.name,
            learningRooms: [roomEntity],
          },
          LearningWorldEntity
        );
    }
  }
}
