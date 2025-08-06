import { inject, injectable } from "inversify";
import IGetNarrativeFrameworkInfoUseCase from "./IGetNarrativeFrameworkInfoUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";
import NarrativeFrameworkTO from "../../DataTransferObjects/NarrativeFrameworkTO";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
export default class GetNarrativeFrameworkInfoUseCase
  implements IGetNarrativeFrameworkInfoUseCase
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

    if (worldEntity === undefined) {
      return;
    }

    if (!worldEntity.narrativeFramework) {
      this.logger.log(
        LogLevelTypes.INFO,
        `GetNarrativeFrameworkInfoUseCase: World ${worldEntity.id} has no narrative framework.`,
      );
      return;
    }
    const narrativeFrameworkTO = new NarrativeFrameworkTO();
    narrativeFrameworkTO.introText = worldEntity.narrativeFramework?.introText;
    narrativeFrameworkTO.outroText = worldEntity.narrativeFramework?.outroText;
    narrativeFrameworkTO.theme = worldEntity.theme;

    //check all spaces if they have at least one scored learningelement
    narrativeFrameworkTO.shownBefore = worldEntity.spaces.some((space) => {
      if (!space.elements) {
        return false;
      }
      return space.elements.some((element) => {
        return element?.hasScored;
      });
    });

    this.logger.log(
      LogLevelTypes.TRACE,
      `GetNarrativeFrameworkInfoUseCase: Got Framework Info of world ${worldEntity.id} from entity.`,
    );
    this.worldPort.onNarrativeFrameworkInfoLoadedOrUpdated(
      narrativeFrameworkTO,
    );
  }
}
