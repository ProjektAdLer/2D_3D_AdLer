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
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  async executeAsync(elementID: ComponentID): Promise<void> {
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      throw new Error(`User is not in a space!`);
    }

    const elementEntity =
      this.entityContainer.filterEntitiesOfType<AdaptivityElementEntity>(
        AdaptivityElementEntity,
        (e) =>
          e.element.id === elementID &&
          e.element.parentWorldID === userLocation.worldID
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

    let adaptivityTO = new AdaptivityElementProgressTO();
    adaptivityTO = Object.assign(
      adaptivityTO,
      structuredClone(elementEntity[0])
    );

    // temporary hardcoded till backend call is available
    adaptivityTO.isCompleted = false;
    adaptivityTO.tasks.forEach((task) => {
      task.isCompleted = false;
      task.questions.forEach((question) => {
        question.isCompleted = false;
      });
    });

    this.worldPort.onAdaptivityElementLoaded(adaptivityTO);

    this.logger.log(
      LogLevelTypes.TRACE,
      "LoadAdaptivityElementUsecase: Loaded."
    );
    return Promise.resolve();
  }
}
