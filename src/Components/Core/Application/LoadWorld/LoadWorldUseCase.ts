import { type tempApiInfo } from "../../Adapters/BackendAdapter/IBackendAdapter";
import { inject, injectable } from "inversify";
import type IBackendAdapter from "../../Adapters/BackendAdapter/IBackendAdapter";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningElementEntity from "../../Domain/Entities/LearningElementEntity";
import LearningRoomEntity from "../../Domain/Entities/LearningRoomEntity";
import LearningWorldEntity from "../../Domain/Entities/LearningWorldEntity";
import UserDataEntity from "../../Domain/Entities/UserDataEntity";
import type IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import type ILearningWorldPort from "../../Ports/LearningWorldPort/ILearningWorldPort";
import ILoadWorldUseCase from "./ILoadWorldUseCase";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import type ILoadAvatarUseCase from "../LoadAvatar/ILoadAvatarUseCase";
import USECASE_TYPES from "../../DependencyInjection/UseCases/USECASE_TYPES";
import H5PLearningElementData from "../../Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import TextLearningElementData from "../../Domain/Entities/SpecificLearningElements/TextLearningElementData";
import VideoLearningElementData from "../../Domain/Entities/SpecificLearningElements/VideoLearningElementData";
import ImageLearningElementData from "../../Domain/Entities/SpecificLearningElements/ImageLearningElementData";
import type IUIPort from "../../Ports/UIPort/IUIPort";
import LearningWorldTO from "../DataTransportObjects/LearningWorldTO";
import LearningElementTO from "../DataTransportObjects/LearningElementTO";

@injectable()
export default class LoadWorldUseCase implements ILoadWorldUseCase {
  constructor(
    @inject(PORT_TYPES.ILearningWorldPort)
    private learningWorldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendAdapter,
    @inject(PORT_TYPES.IUIPort)
    private uiPort: IUIPort,
    @inject(USECASE_TYPES.ILoadAvatarUseCase)
    private loadAvatarUseCase: ILoadAvatarUseCase
  ) {}

  async executeAsync(): Promise<void> {
    const userData = this.container.getEntitiesOfType(UserDataEntity);

    if (userData.length === 0 || userData[0]?.isLoggedIn === false) {
      this.uiPort.displayModal("User is not logged in!", "error");
      return Promise.reject("User is not logged in");
    }

    let learningWorldEntity =
      this.container.getEntitiesOfType(LearningWorldEntity)[0];

    if (!learningWorldEntity) {
      learningWorldEntity = await this.load(userData[0]);
    }

    this.learningWorldPort.presentLearningWorld(this.toTO(learningWorldEntity));
    // TODO: Move this outside of this use case - PG
    await this.loadAvatarUseCase.executeAsync();

    return Promise.resolve();
  }

  private async load(userData: UserDataEntity): Promise<LearningWorldEntity> {
    // TODO: remove hardcoded worldName when a learning world is selected
    let apiData = {
      userToken: userData.userToken,
      worldName: "Lernwelt Autorentool",
    } as tempApiInfo;

    const response = await this.backendAdapter.getLearningWorldData(apiData);

    // create learning room entities with learning element entities
    const learningRoomEntities: LearningRoomEntity[] = [];
    response.learningRooms?.forEach((room) => {
      let learningElementEntities: LearningElementEntity[] = [];
      room.learningElements?.forEach((element) => {
        learningElementEntities.push(this.mapLearningElement(element));
      });

      learningRoomEntities.push(
        this.container.createEntity<LearningRoomEntity>(
          {
            id: room.id,
            name: room.name,
            learningElements: learningElementEntities,
          },
          LearningRoomEntity
        )
      );
    });

    // create learning world entity
    const learningWorldEntity =
      this.container.createEntity<LearningWorldEntity>(
        {
          worldName: response.worldName,
          learningRooms: learningRoomEntities,
          worldGoal: response.worldGoal,
        },
        LearningWorldEntity
      );

    return learningWorldEntity;
  }

  private mapLearningElement = (
    element: LearningElementTO
  ): LearningElementEntity => {
    const entityToStore: Partial<LearningElementEntity> = {
      id: element.id,
      value: element.value,
      requirements: element.requirements ?? [],
      name: element.name,
    };

    switch (element.learningElementData.type) {
      case "text":
        entityToStore.learningElementData = {
          type: "text",
        } as TextLearningElementData;
        break;
      case "image":
        entityToStore.learningElementData = {
          type: "image",
        } as ImageLearningElementData;
        break;
      case "video":
        entityToStore.learningElementData = {
          type: "video",
        } as VideoLearningElementData;
        break;
      case "h5p":
        let h5pElementData =
          element.learningElementData as H5PLearningElementData;
        entityToStore.learningElementData = {
          type: "h5p",
          fileName: h5pElementData.fileName,
          contextId: h5pElementData.contextId,
        } as H5PLearningElementData;
    }

    return this.container.createEntity<LearningElementEntity>(
      entityToStore,
      LearningElementEntity
    );
  };

  private toTO(entityToConvert: LearningWorldEntity): LearningWorldTO {
    // spread to prevent passing a reference
    // this will need to be changed when entity and TO are not matching in structure anymore
    return structuredClone(entityToConvert) as LearningWorldTO;
  }
}
