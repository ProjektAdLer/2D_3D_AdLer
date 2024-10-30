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
import type INotificationPort from "../../../Ports/Interfaces/INotificationPort";
import { NotificationMessages } from "src/Components/Core/Domain/Types/NotificationMessages";
import { AxiosError } from "axios";

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
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
  ) {}

  // similar logic to LoadLearningElementUseCase
  async executeAsync(elementID: number): Promise<void> {
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `LoadExternalLearningElementUseCase: User is not in a space!`,
        NotificationMessages.USER_NOT_IN_SPACE,
      );
      return Promise.resolve();
    }

    const elementEntity =
      this.entityContainer.filterEntitiesOfType<ExternalLearningElementEntity>(
        ExternalLearningElementEntity,
        (e) => e.id === elementID && e.worldID === userLocation.worldID,
      );

    if (elementEntity.length === 0) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `LoadExternalLearningElementUseCase: Could not find element with ID ${elementID} in world ${userLocation.worldID}`,
        NotificationMessages.ELEMENT_NOT_FOUND,
      );
      return Promise.resolve();
    } else if (elementEntity.length > 1) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `LoadExternalLearningElementUseCase: Found more than one element with ID ${elementID} in world ${userLocation.worldID}`,
        NotificationMessages.ELEMENT_NOT_UNIQUE,
      );
      return Promise.resolve();
    }

    let elementTO = this.toTO(elementEntity[0]);

    try {
      elementTO.filePath =
        await this.getElementSourceUseCase.internalExecuteAsync({
          elementID: elementID,
          worldID: elementEntity[0].worldID,
        });

      elementTO.isScoreable = false;

      this.logger.log(
        LogLevelTypes.TRACE,
        `Loaded element ${elementID} in world ${userLocation.worldID}.`,
      );
      this.worldPort.onLearningElementLoaded(elementTO);
    } catch (error) {
      if (error instanceof AxiosError) {
        this.notificationPort.onNotificationTriggered(
          LogLevelTypes.WARN,
          `LoadExternalLearningElementUseCase: Axios encountered error: ${error.code}`,
          NotificationMessages.BACKEND_ERROR,
        );
      }
    }

    return Promise.resolve();
  }

  private toTO(
    elementEntity: ExternalLearningElementEntity,
  ): LearningElementTO {
    return {
      id: elementEntity.id,
      name: elementEntity.name,
      type: elementEntity.type,
    } as LearningElementTO;
  }
}
