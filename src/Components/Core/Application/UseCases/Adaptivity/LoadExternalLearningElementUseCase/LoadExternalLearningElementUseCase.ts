import type IGetUserLocationUseCase from "src/Components/Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import { inject, injectable } from "inversify";
import ILoadExternalLearningElementUseCase from "./ILoadExternalLearningElementUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ExternalLearningElementEntity from "src/Components/Core/Domain/Entities/Adaptivity/ExternalLearningElementEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import LearningElementTO from "../../../DataTransferObjects/LearningElementTO";
import type IGetLearningElementSourceUseCase from "../../GetLearningElementSource/IGetLearningElementSourceUseCase";

@injectable()
export default class LoadExternalLearningElementUseCase
  implements ILoadExternalLearningElementUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.IGetLearningElementSourceUseCase)
    private getElementSourceUseCase: IGetLearningElementSourceUseCase,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  // similar logic to LoadLearningElementUseCase
  async executeAsync(elementID: number): Promise<void> {
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      throw new Error(`User is not in a space!`);
    }

    const elementEntity =
      this.entityContainer.filterEntitiesOfType<ExternalLearningElementEntity>(
        ExternalLearningElementEntity,
        (e) => e.id === elementID && e.worldID === userLocation.worldID
      );

    if (elementEntity.length === 0) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `Could not find element with ID ${elementID} in world ${userLocation.worldID}`
      );
      throw new Error(
        `Could not find element with ID ${elementID} in world ${userLocation.worldID}`
      );
    } else if (elementEntity.length > 1) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `Found more than one element with ID ${elementID} in world ${userLocation.worldID}`
      );
      throw new Error(
        `Found more than one element with ID ${elementID} in world ${userLocation.worldID}`
      );
    }

    let elementTO = this.toTO(elementEntity[0]);

    elementTO.filePath =
      await this.getElementSourceUseCase.internalExecuteAsync({
        elementID: elementID,
        worldID: elementEntity[0].worldID,
      });

    this.logger.log(
      LogLevelTypes.TRACE,
      `Loaded element ${elementID} in world ${userLocation.worldID}.`
    );
    this.worldPort.onLearningElementLoaded(elementTO);

    return Promise.resolve();
  }

  private toTO(
    elementEntity: ExternalLearningElementEntity
  ): LearningElementTO {
    return {
      id: elementEntity.id,
      name: elementEntity.name,
      type: elementEntity.type,
    } as LearningElementTO;
  }
}
