import { inject, injectable } from "inversify";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import IScoreLearningElementUseCase from "./IScoreLearningElementUseCase";
import type IBackendPort from "../../Ports/Interfaces/IBackendPort";
import LearningElementEntity from "../../../Domain/Entities/LearningElementEntity";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import type { IInternalCalculateLearningWorldScoreUseCase } from "../CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import i18next from "i18next";
import type IUpdateExperiencePointsUseCase from "../UpdateExperiencePoints/IUpdateExperiencePointsUseCase";
import type IGetSettingsConfigUseCase from "../GetSettingsConfig/IGetSettingsConfigUseCase";

const learningElementCompletionSoundLink = require("../../../../../Assets/Sounds/LearningElementCompletion.mp3");

@injectable()
export default class ScoreLearningElementUseCase
  implements IScoreLearningElementUseCase
{
  private learningElementCompletionAudio = new Audio(
    learningElementCompletionSoundLink,
  );
  private settings;

  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
    @inject(USECASE_TYPES.ICalculateLearningWorldScoreUseCase)
    private calculateWorldScoreUseCase: IInternalCalculateLearningWorldScoreUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScoreUseCase: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
    @inject(USECASE_TYPES.IUpdateExperiencePointsUseCase)
    private updateExperiencePointsUseCase: IUpdateExperiencePointsUseCase,
    @inject(USECASE_TYPES.IGetSettingsConfigUseCase)
    getSettingsConfigUseCase: IGetSettingsConfigUseCase,
  ) {
    this.settings = getSettingsConfigUseCase.execute();
    this.setupLearningElementCompletionSound();
  }

  private setupLearningElementCompletionSound(): void {
    this.learningElementCompletionAudio.volume = this.settings.volume ?? 0.5;
  }

  async executeAsync(elementID: ComponentID): Promise<void> {
    // get user token
    const userEntity =
      this.entityContainer.getEntitiesOfType(UserDataEntity)[0];

    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      return this.rejectWithWarning(
        "User is not in a space! Trying to score elememt " + elementID,
      );
    }

    let backendSuccessful: boolean;
    // call backend
    try {
      backendSuccessful = await this.backendAdapter.scoreElement(
        userEntity.userToken,
        elementID,
        userLocation.worldID,
      );
    } catch (e) {
      return this.rejectWithWarning(
        "Backend call failed with error: " + e,
        elementID,
      );
    }

    const elements =
      this.entityContainer.filterEntitiesOfType<LearningElementEntity>(
        LearningElementEntity,
        (entity) =>
          entity.parentWorldID === userLocation.worldID &&
          entity.id === elementID,
      );

    if (elements.length === 0)
      return this.rejectWithWarning("No matching element found!", elementID);
    else if (elements.length > 1)
      return this.rejectWithWarning(
        "More than one matching element found!",
        elementID,
      );

    if (!backendSuccessful && !elements[0].hasScored) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.ERROR,
        `ScoreElementUseCase: scoreElement from backend returned: ${backendSuccessful} for learningelement ${elementID} in space ${userLocation.spaceID} of world ${userLocation.worldID}`,
        i18next.t("learningElementScoringFalse", { ns: "errorMessages" }),
      );
      return Promise.reject("error");
    }

    if (!elements[0].hasScored) {
      elements[0].hasScored = true;

      // Play learning element completion sound
      this.learningElementCompletionAudio.play();

      try {
        const newWorldScore = this.calculateWorldScoreUseCase.internalExecute({
          worldID: userLocation.worldID,
        });
        this.worldPort.onLearningWorldScored(newWorldScore);
      } catch (e) {
        this.logger.log(
          LogLevelTypes.ERROR,
          `ScoreLearningElementUseCase: Error calculating new world score: ${e}`,
        );
      }

      try {
        const newSpaceScore = this.calculateSpaceScoreUseCase.internalExecute({
          worldID: userLocation.worldID,
          spaceID: userLocation.spaceID,
        });
        this.worldPort.onLearningSpaceScored(newSpaceScore);
      } catch (e) {
        this.logger.log(
          LogLevelTypes.ERROR,
          `ScoreLearningElementUseCase: Error calculating new space score: ${e}`,
        );
      }
      this.updateExperiencePointsUseCase.internalExecute(elementID);
      this.worldPort.onLearningElementScored(true, elementID);
    }
  }

  private rejectWithWarning(message: string, id?: ComponentID): Promise<void> {
    this.logger.log(
      LogLevelTypes.WARN,
      `ScoreLearningElementUseCase: ` +
        message +
        `${id ? " ElementID: " + id : ""}`,
    );
    return Promise.reject(message);
  }
}
