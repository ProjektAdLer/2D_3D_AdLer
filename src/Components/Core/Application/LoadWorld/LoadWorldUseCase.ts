import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningWorldEntity from "../../Domain/Entities/LearningWorldEntity";
import IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import { IDTO } from "../Abstract/IDTO";
import type ILearningWorldPort from "./ILearningWorldPort";
import { LearningWorldTO } from "./ILearningWorldPort";
import ILoadWorld from "./ILoadWorld";

@injectable()
export default class LoadWorldUseCase implements ILoadWorld {
  private learningWorldEntity: LearningWorldEntity;

  constructor(
    @inject(CORE_TYPES.ILearningWorldPort)
    private learningWorldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer
  ) {
    this.learningWorldPort = learningWorldPort;
  }
  async executeAsync(data?: IDTO): Promise<void> {
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
      this.container.createEntity<LearningWorldEntity>(
        {
          worldName: worldNameResp,
        },
        LearningWorldEntity
      );
    }

    this.learningWorldEntity =
      this.container.getEntitiesOfType(LearningWorldEntity)[0];
  }
}

const fakeFakeApi = async () => {
  // return Promise.resolve(); after 2 seconds
  return await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Fake Response for World");
    }, 2000);
  });
};
