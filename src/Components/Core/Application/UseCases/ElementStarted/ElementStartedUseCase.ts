import { inject, injectable } from "inversify";
import WorldEntity from "src/Components/Core/Domain/Entities/WorldEntity";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ElementEntity from "../../../Domain/Entities/ElementEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import type IElementPort from "../../../Ports/ElementPort/IElementPort";
import IElementStartedUseCase from "./IElementStartedUseCase";

@injectable()
export default class ElementStartedUseCase implements IElementStartedUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.IElementPort)
    private elementPort: IElementPort
  ) {}
  execute(data: { elementId: number }): void {
    const entity = this.entityContainer.filterEntitiesOfType<ElementEntity>(
      ElementEntity,
      (e) => e.id === data.elementId
    );

    const course =
      this.entityContainer.getEntitiesOfType<WorldEntity>(WorldEntity);

    if (entity.length === 0)
      throw new Error(`Could not find element with id ${data?.elementId}`);

    this.elementPort.startElementEditing(entity[0]);
  }
}
