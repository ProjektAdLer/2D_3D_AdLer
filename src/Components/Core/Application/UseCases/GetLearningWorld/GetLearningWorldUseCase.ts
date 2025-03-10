import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetLearningWorldUseCase from "./IGetLearningWorldUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";

@injectable()
export default class GetLearningWorldUseCase
  implements IGetLearningWorldUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
  ) {}

  execute(): void {
    const data = this.getUserLocationUseCase.execute();

    let worldEntity = this.container.filterEntitiesOfType(
      LearningWorldEntity,
      (WorldEntity) => WorldEntity.id === data.worldID,
    )[0];
    let worldTO = new LearningWorldTO();
    worldTO = Object.assign(worldTO, structuredClone(worldEntity));

    this.logger.log(
      LogLevelTypes.TRACE,
      "GetLearningWorldUseCase: Loaded world from entity.",
    );
    this.worldPort.onLearningWorldEntityLoaded(worldTO);
  }
}
