import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningWorldEntity from "../../Domain/Entities/LearningWorldEntity";
import ILearningWorldLoadedPort, {
  LearningWorldTO,
} from "./ILearningWorldLoadedPort";

@injectable()
export default class LoadWorldUseCase {
  private learningWorldEntity: LearningWorldEntity;

  private learningWorldLoadedPort: ILearningWorldLoadedPort;

  constructor(
    @inject(CORE_TYPES.ILearningWorldLoaded)
    learningWorldLoadedPort: ILearningWorldLoadedPort
  ) {
    this.learningWorldLoadedPort = learningWorldLoadedPort;
  }

  public execute(): void {
    this.load();

    var learningElementTO = new LearningWorldTO();
    learningElementTO.id = this.learningWorldEntity.id;
    this.learningWorldLoadedPort.presentLearningWorld(learningElementTO);
  }

  private load(): void {
    this.learningWorldEntity = new LearningWorldEntity();
  }
}
