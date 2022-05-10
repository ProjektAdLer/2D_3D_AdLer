import { inject, injectable } from "inversify";
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
    // Wait for Fake API
    const worldNameResp = await this.backend.getWorld();

    if (this.container.getEntitiesOfType(LearningWorldEntity).length === 0) {
      let elementEntities = new Array<LearningElementEntity>();
      for (let i = 0; i < 4; i++) {
        elementEntities.push(
          this.container.createEntity<LearningElementEntity>(
            {
              type: "h5p",
            },
            LearningElementEntity
          )
        );
      }
      let roomEntity = this.container.createEntity<LearningRoomEntity>(
        {
          learningElements: elementEntities,
        },
        LearningRoomEntity
      );
      this.container.createEntity<LearningWorldEntity>(
        {
          worldName: worldNameResp.name,
          learningRooms: [roomEntity],
        },
        LearningWorldEntity
      );
    }

    this.learningWorldEntity =
      this.container.getEntitiesOfType(LearningWorldEntity)[0];
  }
}
