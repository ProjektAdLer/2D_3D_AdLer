import { inject, injectable } from "inversify";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import LearningElementEntity from "../../../Domain/Entities/LearningElementEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import LearningElementTO from "../../DataTransferObjects/LearningElementTO";
import type IGetLearningElementSourceUseCase from "../GetLearningElementSource/IGetLearningElementSourceUseCase";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import ILoadLearningElementUseCase from "./ILoadLearningElementUseCase";

@injectable()
export default class LoadLearningElementUseCase
  implements ILoadLearningElementUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.IGetLearningElementSourceUseCase)
    private getElementSourceUseCase: IGetLearningElementSourceUseCase,
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
      this.entityContainer.filterEntitiesOfType<LearningElementEntity>(
        LearningElementEntity,
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
        worldID: elementTO.parentWorldID,
      });

    this.worldPort.onLearningElementLoaded(elementTO);

    return Promise.resolve();
  }

  private toTO(elementEntity: LearningElementEntity): LearningElementTO {
    return structuredClone(elementEntity) as LearningElementTO;
  }
}
