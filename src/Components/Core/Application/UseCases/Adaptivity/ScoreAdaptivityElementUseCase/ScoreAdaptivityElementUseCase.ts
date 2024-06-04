import { ComponentID } from "../../../../Domain/Types/EntityTypes";
import IScoreAdaptivityElementUseCase from "./IScoreAdaptivityElementUseCase";
import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import EntityContainer from "../../../../Domain/EntityContainer/EntityContainer";
import UserDataEntity from "../../../../Domain/Entities/UserDataEntity";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../../../Domain/Types/LogLevelTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../../GetUserLocation/IGetUserLocationUseCase";
import LearningElementEntity from "../../../../Domain/Entities/LearningElementEntity";
import type { IInternalCalculateLearningWorldScoreUseCase } from "../../CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../../Ports/Interfaces/ILearningWorldPort";
import type IBeginStoryElementOutroCutSceneUseCase from "../../BeginStoryElementOutroCutScene/IBeginStoryElementOutroCutSceneUseCase";
import type { IInternalGetLoginStatusUseCase } from "../../GetLoginStatus/IGetLoginStatusUseCase";

@injectable()
export default class ScoreAdaptivityElementUseCase
  implements IScoreAdaptivityElementUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: EntityContainer,
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(USECASE_TYPES.ICalculateLearningWorldScoreUseCase)
    private calculateWorldScoreUseCase: IInternalCalculateLearningWorldScoreUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScoreUseCase: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.IBeginStoryElementOutroCutSceneUseCase)
    private beginStoryElementOutroCutSceneUseCase: IBeginStoryElementOutroCutSceneUseCase,
    @inject(USECASE_TYPES.IGetLoginStatusUseCase)
    private getLoginStatusUseCase: IInternalGetLoginStatusUseCase
  ) {}

  internalExecute(elementID: ComponentID): void {
    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      this.warn(
        "User is not in a world or space! Trying to score element " + elementID
      );
      return;
    }

    const elements =
      this.entityContainer.filterEntitiesOfType<LearningElementEntity>(
        LearningElementEntity,
        (entity) =>
          entity.parentWorldID === userLocation.worldID &&
          entity.id === elementID
      );

    if (elements.length === 0) {
      this.warn("No matching element found!", elementID);
      return;
    } else if (elements.length > 1) {
      this.warn("More than one matching element found!", elementID);
      return;
    }

    elements[0].hasScored = true;

    const newWorldScore = this.calculateWorldScoreUseCase.internalExecute({
      worldID: userLocation.worldID,
    });

    const newSpaceScore = this.calculateSpaceScoreUseCase.internalExecute({
      worldID: userLocation.worldID,
      spaceID: userLocation.spaceID,
    });

    // trigger cutscene
    this.beginStoryElementOutroCutSceneUseCase.execute({
      scoredLearningElementID: elementID,
    });

    this.worldPort.onLearningElementScored(true, elementID);
    this.worldPort.onLearningSpaceScored(newSpaceScore);
    this.worldPort.onLearningWorldScored(newWorldScore);
  }

  private warn(message: string, id?: ComponentID): void {
    this.logger.log(
      LogLevelTypes.WARN,
      `ScoreLearningElementUseCase: ` +
        message +
        `${id ? " ElementID: " + id : ""}`
    );
  }
}
