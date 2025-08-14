import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import { inject, injectable } from "inversify";
import IGetExperiencePointsUseCase from "./IGetExperiencePoints";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";
import ExperiencePointsTO from "../../DataTransferObjects/ExperiencePointsTO";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";

@injectable()
export default class GetExperiencePointsUseCase
  implements IGetExperiencePointsUseCase
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
  ) {}

  execute(): void {
    const userLocation = this.getUserLocationUseCase.execute();
    if (userLocation.worldID === undefined) {
      this.logger.log(
        LogLevelTypes.WARN,
        "GetExperiencePointsUseCase: User ist not in a world!",
      );
      return;
    }

    const userDataEntity =
      this.entityContainer.getEntitiesOfType(UserDataEntity)[0];
    if (
      userDataEntity.availableWorlds.find(
        (world) => world.worldID === userLocation.worldID,
      ) === undefined
    ) {
      this.logger.log(
        LogLevelTypes.WARN,
        "GetExperiencePointsUseCase: World is not available!",
      );
      return;
    }

    const xpEntity = userDataEntity.experiencePoints.find(
      (xp) => xp.worldID === userLocation.worldID,
    );

    if (xpEntity) {
      const experienceTO = {
        maxLevel: xpEntity?.maxLevel,
        currentLevel: xpEntity?.currentLevel,
        currentExperiencePoints: xpEntity?.currentExperiencePoints,
        numberOfLevelUps: 0,
      } as ExperiencePointsTO;
      this.worldPort.onExperiencePointsUpdated(experienceTO);
    }
  }
}
