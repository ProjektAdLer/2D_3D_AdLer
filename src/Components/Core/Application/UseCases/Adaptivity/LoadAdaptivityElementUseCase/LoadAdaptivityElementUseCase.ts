import AdaptivityElementProgressTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import { inject, injectable } from "inversify";
import ILoadAdaptivityElementUseCase from "./ILoadAdaptivityElementUseCase";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../../Ports/Interfaces/ILearningWorldPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../../GetUserLocation/IGetUserLocationUseCase";
import AdaptivityElementEntity from "src/Components/Core/Domain/Entities/Adaptivity/AdaptivityElementEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type IGetAdaptivityElementStatusUseCase from "../GetAdaptivityElementStatusUseCase/IGetAdaptivityElementStatusUseCase";
import type INotificationPort from "../../../Ports/Interfaces/INotificationPort";
import { ErrorTypes } from "src/Components/Core/Domain/Types/ErrorTypes";

@injectable()
export default class LoadAdaptivityElementUseCase
  implements ILoadAdaptivityElementUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(USECASE_TYPES.IGetAdaptivityElementStatusUseCase)
    private getAdaptivityElementStatusUseCase: IGetAdaptivityElementStatusUseCase,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
  ) {}

  async executeAsync(elementID: ComponentID): Promise<void> {
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `LoadAdaptivityElementUseCase: User is not in a space!`,
        ErrorTypes.USER_NOT_IN_SPACE,
      );
      return Promise.resolve();
    }

    const elementEntity =
      this.entityContainer.filterEntitiesOfType<AdaptivityElementEntity>(
        AdaptivityElementEntity,
        (e) =>
          e.element.id === elementID &&
          e.element.parentWorldID === userLocation.worldID,
      );

    if (elementEntity.length === 0) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `Could not find element with ID ${elementID} in world ${userLocation.worldID}`,
        ErrorTypes.ELEMENT_NOT_FOUND,
      );
      return Promise.resolve();
    } else if (elementEntity.length > 1) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `Found more than one element with ID ${elementID} in world ${userLocation.worldID}`,
        ErrorTypes.ELEMENT_NOT_UNIQUE,
      );
      return Promise.resolve();
    }

    let adaptivityTO = new AdaptivityElementProgressTO();
    adaptivityTO = Object.assign(
      adaptivityTO,
      structuredClone(elementEntity[0]),
    );
    adaptivityTO.elementName = elementEntity[0].element.name;
    adaptivityTO.id = elementEntity[0].element.id;
    adaptivityTO.model = elementEntity[0].element.model;

    try {
      await this.getAdaptivityElementStatusUseCase.internalExecuteAsync(
        adaptivityTO,
      );

      this.worldPort.onAdaptivityElementLoaded(adaptivityTO);

      this.logger.log(
        LogLevelTypes.TRACE,
        "LoadAdaptivityElementUsecase: Loaded.",
      );
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === ErrorTypes.USER_NOT_IN_SPACE
      ) {
        this.notificationPort.onNotificationTriggered(
          LogLevelTypes.WARN,
          `LoadAdaptivityElementUseCase: User is not in a space!`,
          ErrorTypes.USER_NOT_IN_SPACE,
        );
        throw error;
      }
    }

    return Promise.resolve();
  }
}
