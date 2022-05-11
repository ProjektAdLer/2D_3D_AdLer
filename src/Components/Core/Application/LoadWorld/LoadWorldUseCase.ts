import { APILearningRoomTO } from "./../../Adapters/Backend/APILearningRoomTO";
import { inject, injectable } from "inversify";
import { APILearningElementTO } from "../../Adapters/Backend/APILearningElementTO";
import { type IBackend } from "../../Adapters/Backend/IBackend";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningElementEntity from "../../Domain/Entities/LearningElementEntity";

import LearningRoomEntity from "../../Domain/Entities/LearningRoomEntity";
import LearningWorldEntity from "../../Domain/Entities/LearningWorldEntity";
import IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import type ILearningWorldPort from "./ILearningWorldPort";
import { LearningWorldTO } from "./ILearningWorldPort";
import ILoadWorldUseCase from "./ILoadWorldUseCase";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class LoadWorldUseCase implements ILoadWorldUseCase {
  private learningWorldEntity: LearningWorldEntity;

  constructor(
    @inject(PORT_TYPES.ILearningWorldPort)
    private learningWorldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackend) private backend: IBackend
  ) {}

  async executeAsync(): Promise<void> {
    await this.load();

    this.learningWorldPort.presentLearningWorld(
      this.toTO(this.learningWorldEntity)
    );

    return Promise.resolve();
  }

  private toTO(entityToConvert: LearningWorldEntity): LearningWorldTO {
    return {
      learningRooms: entityToConvert.learningRooms,
      worldName: entityToConvert.worldName,
    };
  }

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
        const returnvValue = this.container.createEntity<LearningElementEntity>(
          {
            id: element.id,
            type: element.elementType,
            value: element.value[0].value,
            requirement: element.requirements[0].value,
          },
          LearningElementEntity
        );

        learningElementEntities.push(returnvValue);
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
