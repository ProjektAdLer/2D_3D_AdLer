import { APILearningRoomTO } from "./../../Adapters/Backend/APILearningRoomTO";
import { inject, injectable } from "inversify";
import { APILearningElementTO } from "../../Adapters/Backend/APILearningElementTO";
import type IBackend from "../../Adapters/Backend/IBackend";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningElementEntity from "../../Domain/Entities/LearningElementEntity";
import LearningRoomEntity from "../../Domain/Entities/LearningRoomEntity";
import LearningWorldEntity from "../../Domain/Entities/LearningWorldEntity";
import type IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import type ILearningWorldPort from "./ILearningWorldPort";
import { LearningWorldTO } from "./ILearningWorldPort";
import ILoadWorldUseCase from "./ILoadWorldUseCase";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import ILoadAvatarUseCase from "../LoadAvatar/ILoadAvatarUseCase";
import USECASE_TYPES from "../../DependencyInjection/UseCases/USECASE_SYMBOLS";
import AbstractLearningElement from "../../Domain/Entities/SpecificLearningElements/AbstractLearningElement";
import H5PLearningElementData from "../../Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import TextLearningElementData from "../../Domain/Entities/SpecificLearningElements/TextLearningElementData";

@injectable()
export default class LoadWorldUseCase implements ILoadWorldUseCase {
  private learningWorldEntity: LearningWorldEntity;

  constructor(
    @inject(PORT_TYPES.ILearningWorldPort)
    private learningWorldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackend)
    private backend: IBackend
  ) {}

  async executeAsync(): Promise<void> {
    await this.load();

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

  private async load(): Promise<void> {
    const worldResp = await this.backend.getWorld();
    const learningRoomResp =
      (await this.backend.getLearningRooms()) as APILearningRoomTO[];
    const learningElementResp =
      (await this.backend.getLearningElements()) as APILearningElementTO[];

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
