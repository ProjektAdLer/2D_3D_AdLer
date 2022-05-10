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

@injectable()
export default class LoadWorldUseCase implements ILoadWorldUseCase {
  private learningWorldEntity: LearningWorldEntity;

  constructor(
    @inject(CORE_TYPES.ILearningWorldPort)
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
      id: entityToConvert.id,
      learningRooms: entityToConvert.learningRooms,
      worldName: entityToConvert.worldName,
    };
  }

  private async load(): Promise<void> {
    const worldResp = await this.backend.getWorld();
    const learningRoomResp = await this.backend.getLearningRooms();
    const learningElementResp =
      (await this.backend.getLearningElements()) as APILearningElementTO[];

    if (this.container.getEntitiesOfType(LearningWorldEntity).length === 0) {
      const learningElementEntities: LearningElementEntity[] = [];
      learningElementResp.forEach((element) => {
        const returnvValue = this.container.createEntity<LearningElementEntity>(
          {
            learningElementId: element.id,
            type: "h5p",
            value: element.value[0].value,
            requirement: element.requirements[0].value,
          },
          LearningElementEntity
        );

        learningElementEntities.push(returnvValue);
      });

      let roomEntity = this.container.createEntity<LearningRoomEntity>(
        {
          learningElements: learningElementEntities,
        },
        LearningRoomEntity
      );
      this.container.createEntity<LearningWorldEntity>(
        {
          worldName: worldResp.name,
          learningRooms: [roomEntity],
        },
        LearningWorldEntity
      );
    }

    this.learningWorldEntity =
      this.container.getEntitiesOfType(LearningWorldEntity)[0];
  }
}
