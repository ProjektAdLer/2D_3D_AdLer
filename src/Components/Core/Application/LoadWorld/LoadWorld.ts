import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningWorldEntity from "../../Domain/Entities/LearningWorldEntity";
import ILearningWorldPort, { LearningWorldTO } from "./ILearningWorldPort";

@injectable()
export default class LoadWorldUseCase {
  private learningWorldEntity: LearningWorldEntity;

  private learningWorldPort: ILearningWorldPort;

  constructor(
    @inject(CORE_TYPES.ILearningWorldLoaded)
    learningWorldPort: ILearningWorldPort
  ) {
    this.learningWorldPort = learningWorldPort;
  }

  public execute(): void {
    this.load();

    this.learningWorldPort.presentLearningWorld(
      this.toTO(this.learningWorldEntity)
    );
  }

  private toTO(entityToConvert: LearningWorldEntity): LearningWorldTO {
    return {
      id: entityToConvert.id,
      learningRooms: entityToConvert.learningRooms,
    };
  }

  private load(): void {
    this.learningWorldEntity = new LearningWorldEntity();
  }
}
