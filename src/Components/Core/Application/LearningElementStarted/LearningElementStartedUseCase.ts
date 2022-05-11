import { inject } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import LearningElementEntity from "../../Domain/Entities/LearningElementEntity";
import IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import { IDTO } from "../Abstract/IDTO";
import ILearningElementPort from "./ILearningElementPort";
import ILearningElementStartedUseCase from "./ILearningElementStartedUseCase";

export default class LearningElementStartedUseCase
  implements ILearningElementStartedUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.ILearningElementPort)
    private learningElementPort: ILearningElementPort
  ) {}
  execute(data?: { learningElementId: number }): void {
    const entity =
      this.entityContainer.filterEntitiesOfTye<LearningElementEntity>(
        LearningElementEntity,
        (e) => e.id === data?.learningElementId
      );

    if (entity.length === 0)
      throw new Error(
        `Could not find learning element with id ${data?.learningElementId}`
      );

    this.learningElementPort.presentLearningElement(entity[0]);
  }
}
