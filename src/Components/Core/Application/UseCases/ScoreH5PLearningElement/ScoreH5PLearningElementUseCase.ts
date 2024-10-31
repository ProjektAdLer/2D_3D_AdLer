import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { inject, injectable } from "inversify";
import type IBackendPort from "src/Components/Core/Application/Ports/Interfaces/IBackendPort";
import LearningElementEntity from "src/Components/Core/Domain/Entities/LearningElementEntity";
import LearningSpaceEntity from "src/Components/Core/Domain/Entities/LearningSpaceEntity";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IScoreH5PElementUseCase, {
  XAPIEvent,
} from "./IScoreH5PLearningElementUseCase";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type { IInternalCalculateLearningWorldScoreUseCase } from "../CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";

@injectable()
export default class ScoreH5PElementUseCase implements IScoreH5PElementUseCase {
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IBackendAdapter) private backendAdapter: IBackendPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScoreUseCase: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(USECASE_TYPES.ICalculateLearningWorldScoreUseCase)
    private calculateWorldScoreUseCase: IInternalCalculateLearningWorldScoreUseCase,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
  ) {}

  async executeAsync(data: {
    xapiData: XAPIEvent;
    elementID: ComponentID;
  }): Promise<boolean> {
    if (!data.elementID || !data.xapiData) {
      return this.rejectWithWarning("data is (atleast partly) undefined!");
    }

    // get user token
    const userEntity =
      this.entityContainer.getEntitiesOfType(UserDataEntity)[0];

    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      return this.rejectWithWarning("User is not in a space!");
    }

    // call backend
    const scoredSuccessful = await this.backendAdapter.scoreH5PElement({
      userToken: userEntity.userToken,
      h5pID: data.elementID,
      courseID: userLocation.worldID,
      rawH5PEvent: data.xapiData,
    });
    if (!scoredSuccessful) {
      return this.rejectWithWarning("Backend call failed!");
    }
    // do scoring, if backend call returned successful scoring
    else {
      // get element
      const elements: LearningElementEntity[] =
        this.entityContainer.filterEntitiesOfType<LearningElementEntity>(
          LearningElementEntity,
          (entity) => {
            return (
              entity.id === data.elementID &&
              entity.parentWorldID === userLocation.worldID
            );
          },
        );

      if (elements.length === 0)
        return this.rejectWithWarning("No matching element found!");
      else if (elements.length > 1)
        return this.rejectWithWarning("More than one matching element found!");

      const element: LearningElementEntity = elements[0];

      // get space
      const space: LearningSpaceEntity =
        this.entityContainer.filterEntitiesOfType<LearningSpaceEntity>(
          LearningSpaceEntity,
          (space) => space?.id === userLocation.spaceID,
        )[0];
      if (!space) {
        return this.rejectWithWarning("Space with given element not found!");
      }

      // prevents calling usecases and ports multiple times
      if (!element.hasScored) {
        element.hasScored = true;

        try {
          const newWorldScore = this.calculateWorldScoreUseCase.internalExecute(
            {
              worldID: userLocation.worldID,
            },
          );
          this.worldPort.onLearningWorldScored(newWorldScore);
        } catch (e) {
          this.logger.log(
            LogLevelTypes.ERROR,
            `ScoreH5PLearningElementUseCase: Error calculating new world score: ${e}`,
          );
        }

        try {
          const newSpaceScore = this.calculateSpaceScoreUseCase.internalExecute(
            {
              worldID: userLocation.worldID,
              spaceID: userLocation.spaceID,
            },
          );
          this.worldPort.onLearningSpaceScored(newSpaceScore);
        } catch (e) {
          this.logger.log(
            LogLevelTypes.ERROR,
            `ScoreH5PLearningElementUseCase: Error calculating new space score: ${e}`,
          );
        }

        this.worldPort.onLearningElementScored(true, data.elementID);
      }
    }

    this.logger.log(
      LogLevelTypes.TRACE,
      `Scored h5p element ${data.elementID} in world ${userLocation.worldID}.`,
    );
    return Promise.resolve(scoredSuccessful);
  }

  private rejectWithWarning(message: string): Promise<boolean> {
    this.logger.log(
      LogLevelTypes.WARN,
      "ScoreH5PLearningElementUseCase: " + message,
    );
    return Promise.reject(message);
  }
}
