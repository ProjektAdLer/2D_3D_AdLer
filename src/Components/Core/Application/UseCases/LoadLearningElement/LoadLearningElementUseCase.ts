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
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import { NotificationMessages } from "src/Components/Core/Domain/Types/NotificationMessages";
import { AxiosError } from "axios";

@injectable()
export default class LoadLearningElementUseCase
  implements ILoadLearningElementUseCase
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

  async executeAsync(data: {
    elementID: ComponentID;
    isScoreable: boolean;
  }): Promise<void> {
    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `LoadLearningElementUseCase: User is not in a space!`,
        NotificationMessages.USER_NOT_IN_SPACE,
      );
      return Promise.resolve();
    }

    const elementID = data.elementID;
    const elementEntity =
      this.entityContainer.filterEntitiesOfType<LearningElementEntity>(
        LearningElementEntity,
        (e) => e.id === elementID && e.parentWorldID === userLocation.worldID,
      );

    if (elementEntity.length === 0) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `Could not find element with ID ${elementID} in world ${userLocation.worldID}`,
        NotificationMessages.ELEMENT_NOT_FOUND,
      );
      return Promise.resolve();
    } else if (elementEntity.length > 1) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `Found more than one element with ID ${elementID} in world ${userLocation.worldID}`,
        NotificationMessages.ELEMENT_NOT_UNIQUE,
      );
      return Promise.resolve();
    }
    let elementTO = this.toTO(elementEntity[0]);

    try {
      elementTO.filePath =
        await this.getElementSourceUseCase.internalExecuteAsync({
          elementID: elementID,
          worldID: elementTO.parentWorldID,
        });

      elementTO.isScoreable = data.isScoreable;

      this.logger.log(
        LogLevelTypes.TRACE,
        `Loaded element ${elementID} in world ${userLocation.worldID}.`,
      );
      this.worldPort.onLearningElementLoaded(elementTO);
    } catch (error) {
      if (error instanceof AxiosError) {
        this.notificationPort.onNotificationTriggered(
          LogLevelTypes.WARN,
          `LoadLearningElementUseCase: Axios encountered error: ${error.code}`,
          NotificationMessages.BACKEND_ERROR,
        );
      }
    }

    return Promise.resolve();
  }

  private toTO(elementEntity: LearningElementEntity): LearningElementTO {
    return structuredClone(elementEntity) as LearningElementTO;
  }
}
