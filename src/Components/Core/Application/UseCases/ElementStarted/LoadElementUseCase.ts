import { inject, injectable } from "inversify";
import type IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ElementEntity from "../../../Domain/Entities/ElementEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import ElementTO from "../../DataTransferObjects/ElementTO";
import type IGetElementSourceUseCase from "../GetElementSource/IGetElementSourceUseCase";
import ILoadElementUseCase from "./ILoadElementUseCase";

@injectable()
export default class LoadElementUseCase implements ILoadElementUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(USECASE_TYPES.IGetElementSourceUseCase)
    private getElementSourceUseCase: IGetElementSourceUseCase
  ) {}

  async executeAsync(elementID: number): Promise<void> {
    const elementEntity =
      this.entityContainer.filterEntitiesOfType<ElementEntity>(
        ElementEntity,
        (e) => e.id === elementID
      );

    if (elementEntity.length === 0)
      throw new Error(`Could not find element with id ${elementID}`);
    else if (elementEntity.length > 1)
      throw new Error(`Found more than one element with id ${elementID}`);

    let elementTO = this.toTO(elementEntity[0]);

    elementTO.filePath = await this.getElementSourceUseCase.executeAsync({
      elementID: elementID,
      courseID: elementTO.parentCourseID,
    });

    this.worldPort.onElementLoaded(elementTO);

    return Promise.resolve();
  }

  private toTO(elementEntity: ElementEntity): ElementTO {
    return structuredClone(elementEntity) as ElementTO;
  }
}
