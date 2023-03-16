import { inject, injectable } from "inversify";
import type IWorldPort from "src/Components/Core/Application/Ports/Interfaces/IWorldPort";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ElementEntity from "../../../Domain/Entities/ElementEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import ElementTO from "../../DataTransferObjects/ElementTO";
import type IGetElementSourceUseCase from "../GetElementSource/IGetElementSourceUseCase";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import ILoadElementUseCase from "./ILoadElementUseCase";

@injectable()
export default class LoadElementUseCase implements ILoadElementUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(USECASE_TYPES.IGetElementSourceUseCase)
    private getElementSourceUseCase: IGetElementSourceUseCase,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  async executeAsync(elementID: number): Promise<void> {
    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      throw new Error(`User is not in a space!`);
    }

    const elementEntity =
      this.entityContainer.filterEntitiesOfType<ElementEntity>(
        ElementEntity,
        (e) => e.id === elementID && e.parentWorldID === userLocation.worldID
      );

    if (elementEntity.length === 0)
      throw new Error(
        `Could not find element with ID ${elementID} in world ${userLocation.worldID}`
      );
    else if (elementEntity.length > 1)
      throw new Error(
        `Found more than one element with ID ${elementID} in world ${userLocation.worldID}`
      );

    let elementTO = this.toTO(elementEntity[0]);

    elementTO.filePath =
      await this.getElementSourceUseCase.internalExecuteAsync({
        elementID: elementID,
        courseID: elementTO.parentWorldID,
      });

    this.worldPort.onElementLoaded(elementTO);

    return Promise.resolve();
  }

  private toTO(elementEntity: ElementEntity): ElementTO {
    return structuredClone(elementEntity) as ElementTO;
  }
}
