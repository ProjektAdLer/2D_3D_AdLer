import { inject, injectable } from "inversify";
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
    private container: IEntityContainer
  ) {
    this.learningWorldPort = learningWorldPort;
  }

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
    const worldNameResp = await fakeFakeApi();

    if (this.container.getEntitiesOfType(LearningWorldEntity).length === 0) {
      let elementEntity = this.container.createEntity<LearningElementEntity>(
        {
          type: "h5p",
        },
        LearningElementEntity
      );
      let roomEntity = this.container.createEntity<LearningRoomEntity>(
        {
          learningElements: [elementEntity],
        },
        LearningRoomEntity
      );
      this.container.createEntity<LearningWorldEntity>(
        {
          worldName: worldNameResp,
          learningRooms: [roomEntity],
        },
        LearningWorldEntity
      );
    }

    this.learningWorldEntity =
      this.container.getEntitiesOfType(LearningWorldEntity)[0];
  }
}

const fakeFakeApi = async () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Weltname von Fake API nach 2 Sekunden");
    }, 2000);
  });
};
