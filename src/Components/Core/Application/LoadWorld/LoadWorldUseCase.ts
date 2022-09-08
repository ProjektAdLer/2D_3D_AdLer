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
  private learningWorldEntity: LearningWorldEntity;

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

    await this.load(userData[0]);

    this.learningWorldPort.presentLearningWorld(
      this.toTO(this.learningWorldEntity)
    );
    // TODO: Move this outside of this use case - PG
    await this.loadAvatarUseCase.executeAsync();

    return Promise.resolve();
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

  private async load(userData: UserDataEntity): Promise<void> {
    const worldName = "Lernwelt Autorentool";

    let apiData = {
      userToken: userData.userToken,
      worldName: worldName,
    } as tempApiInfo;

    const response = await this.backendAdapter.getLearningWorldData(apiData);

    if (this.container.getEntitiesOfType(LearningWorldEntity).length === 0) {
      // learningRooms with learningElements
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

      // Learning World
      this.learningWorldEntity =
        this.container.createEntity<LearningWorldEntity>(
          {
            worldName: response.worldName,
            learningRooms: learningRoomEntities,
            worldGoal: response.worldGoal,
          },
          LearningWorldEntity
        );
    }
  }

  private toTO(entityToConvert: LearningWorldEntity): LearningWorldTO {
    return {
      learningRooms: entityToConvert.learningRooms.map((room) => {
        return {
          id: room.id,
          name: room.name,
          learningElements: room.learningElements.map((element) => {
            return {
              id: element.id,
              name: element.name,
              value: element.value,
              requirements: element.requirements,
              learningElementData: element.learningElementData,
            };
          }),
        };
      }),
      worldName: entityToConvert.worldName,
      worldGoal: entityToConvert.worldGoal,
    };
  }
}
