import { inject, injectable } from "inversify";
import WorldEntity from "src/Components/Core/Domain/Entities/WorldEntity";
import type IElementPort from "src/Components/Core/Ports/ElementPort/IElementPort";
import type IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ElementEntity from "../../../Domain/Entities/ElementEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import ElementTO from "../../DataTransferObjects/ElementTO";
import type IGetElementSourceUseCase from "../GetElementSource/IGetElementSourceUseCase";
import IElementStartedUseCase from "./IElementStartedUseCase";

@injectable()
export default class ElementStartedUseCase implements IElementStartedUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.IElementPort)
    private elementPort: IElementPort,
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(USECASE_TYPES.IGetElementSourceUseCase)
    private getElementSourceUseCase: IGetElementSourceUseCase
  ) {}

  async executeAsync(elementID: number): Promise<void> {
    const entity = this.entityContainer.filterEntitiesOfType<ElementEntity>(
      ElementEntity,
      (e) => e.id === elementID
    );

    if (entity.length === 0)
      throw new Error(`Could not find element with id ${elementID}`);
    else if (entity.length > 1)
      throw new Error(`Found more than one element with id ${elementID}`);

    const course =
      this.entityContainer.getEntitiesOfType<WorldEntity>(WorldEntity);

    if (course.length === 0)
      throw new Error(`Could not find any world entities`);
    else if (course.length > 1)
      throw new Error(`Found more than one world entity`);

    let elementTO = this.toTO(entity[0]);

    elementTO.filePath = await this.getElementSourceUseCase.executeAsync({
      elementId: elementID,
      courseId: course[0].worldID, // TODO: Use actual loaded course id
    });

    this.worldPort.onElementLoaded(elementTO);
    this.elementPort.onElementLoaded(elementTO);

    return Promise.resolve();
  }

  private toTO(elementEntity: ElementEntity): ElementTO {
    return structuredClone(elementEntity) as ElementTO;
  }
}
