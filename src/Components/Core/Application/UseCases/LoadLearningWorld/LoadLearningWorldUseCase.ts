import { inject, injectable } from "inversify";
import type IBackendPort from "../../Ports/Interfaces/IBackendPort";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import LearningElementEntity from "../../../Domain/Entities/LearningElementEntity";
import LearningSpaceEntity from "../../../Domain/Entities/LearningSpaceEntity";
import LearningWorldEntity from "../../../Domain/Entities/LearningWorldEntity";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";
import ILoadLearningWorldUseCase from "./ILoadLearningWorldUseCase";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import { Semaphore } from "src/Lib/Semaphore";
import LearningWorldStatusTO from "../../DataTransferObjects/LearningWorldStatusTO";
import type ISetUserLocationUseCase from "../SetUserLocation/ISetUserLocationUseCase";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import BackendWorldTO from "../../DataTransferObjects/BackendWorldTO";
import {
  BackendAdaptivityElementTO,
  BackendBaseElementTO,
  BackendLearningElementTO,
} from "../../DataTransferObjects/BackendElementTO";
import type ICalculateLearningSpaceAvailabilityUseCase from "../CalculateLearningSpaceAvailability/ICalculateLearningSpaceAvailabilityUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import AdaptivityElementEntity from "src/Components/Core/Domain/Entities/Adaptivity/AdaptivityElementEntity";
import { AdaptivityElementDataTO } from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementDataTO";
import ExternalLearningElementEntity from "src/Components/Core/Domain/Entities/Adaptivity/ExternalLearningElementEntity";
import LearningSpaceThemeLookup from "src/Components/Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import { LearningElementTypes } from "src/Components/Core/Domain/Types/LearningElementTypes";
import ArrayItemRandomizer from "src/Components/Core/Presentation/Utils/ArrayItemRandomizer/ArrayItemRandomizer";
import {
  LearningElementModel,
  isValidLearningElementModelType,
} from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";
import StoryElementEntity from "src/Components/Core/Domain/Entities/StoryElementEntity";
import BackendStoryTO from "../../DataTransferObjects/BackendStoryTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import type { IInternalGetLoginStatusUseCase } from "../GetLoginStatus/IGetLoginStatusUseCase";
import { NotificationMessages } from "src/Components/Core/Domain/Types/NotificationMessages";
import NarrativeFrameworkEntity from "src/Components/Core/Domain/Entities/NarrativeFrameworkEntity";
import PointBasedDisplay from "src/Components/Core/Presentation/Utils/ElementCompletionDisplay/PointBasedDisplay";
import IElementCompletionDisplay from "src/Components/Core/Presentation/Utils/ElementCompletionDisplay/IElementCompletionDisplay";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";
import RequirementBasedDisplay from "src/Components/Core/Presentation/Utils/ElementCompletionDisplay/RequirementBasedDisplay";
import type ICalculateInitialExperiencePointsUseCase from "../CalculateInitialExperiencePoints/ICalculateInitialExperiencePointsUseCase";

@injectable()
export default class LoadLearningWorldUseCase
  implements ILoadLearningWorldUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScore: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(USECASE_TYPES.ISetUserLocationUseCase)
    private setUserLocationUseCase: ISetUserLocationUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase)
    private calculateSpaceAvailabilityUseCase: ICalculateLearningSpaceAvailabilityUseCase,
    @inject(USECASE_TYPES.IGetLoginStatusUseCase)
    private getLoginStatusUseCase: IInternalGetLoginStatusUseCase,
    @inject(USECASE_TYPES.ICalculateInitialExperiencePointsUseCase)
    private calculateInitialExperiencePointsUseCase: ICalculateInitialExperiencePointsUseCase,
  ) {}

  private semaphore = new Semaphore("LoadWorld in Use", 1);

  async internalExecuteAsync(data: {
    worldID: number;
  }): Promise<LearningWorldTO> {
    const loadedWorld = await this.loadWorld(data);

    this.calculateInitialExperiencePointsUseCase.internalExecute(
      loadedWorld.id,
    );

    this.logger.log(
      LogLevelTypes.TRACE,
      "LoadLearningWorldUseCase (internalExecuteAsync): Loaded world and cumulated space scores.",
    );
    return loadedWorld;
  }

  async executeAsync(data: { worldID: number }): Promise<void> {
    const loadedWorld = await this.loadWorld(data);

    this.setUserLocationUseCase.execute({ worldID: data.worldID });

    this.logger.log(
      LogLevelTypes.TRACE,
      "LoadLearningWorldUseCase (executeAsync): Loaded world and cumulated space scores.",
    );
    this.worldPort.onLearningWorldLoaded(loadedWorld);
  }

  async loadWorld(data: { worldID: number }): Promise<LearningWorldTO> {
    const loginStatus = this.getLoginStatusUseCase.internalExecute();
    if (!loginStatus.isLoggedIn) {
      this.logger.log(
        LogLevelTypes.ERROR,
        "LoadLearningWorldUseCase: User is not logged in!",
      );
      return Promise.reject("User is not logged in");
    }
    // check if world is available to user
    const userData = this.container.getEntitiesOfType(UserDataEntity);
    if (
      userData[0].availableWorlds.find(
        (world) => world.worldID === data.worldID,
      ) === undefined
    ) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.ERROR,
        "LoadLearningWorldUseCase: World is not available!",
        "World is not available!",
      );
      return Promise.reject("World is not available");
    }

    // acquire semaphore lock, to prevent inconsistencies when the same learning world is loaded multiple times
    const lock = await this.semaphore.acquire();

    // search for world entity with given ID in all world entities
    let worldEntity = this.container.filterEntitiesOfType(
      LearningWorldEntity,
      (WorldEntity) => WorldEntity.id === data.worldID,
    )[0];

    if (!worldEntity) {
      worldEntity = await this.loadLearningWorldFromBackend(
        userData[0].userToken,
        data.worldID,
      );
    }

    lock.release();

    let worldTO =
      this.createLearningWorldTOFromLearningWorldEntity(worldEntity);

    // cumulate element scores for each space
    worldTO.spaces.forEach((space) => {
      try {
        let spaceScores = this.calculateSpaceScore.internalExecute({
          spaceID: space.id,
          worldID: worldEntity.id,
        });
        space.currentScore = spaceScores.currentScore;
        space.maxScore = spaceScores.maxScore;
      } catch (e) {
        this.notificationPort.onNotificationTriggered(
          LogLevelTypes.ERROR,
          "LoadLearningWorldUseCase: Failed to calculate space score. " + e,
          NotificationMessages.SPACE_SCORING_FAILED,
        );
      }

      let spaceAvailability =
        this.calculateSpaceAvailabilityUseCase.internalExecute({
          spaceID: space.id,
          worldID: worldEntity.id,
        });
      space.isAvailable = spaceAvailability.isAvailable;
      space.requirementsString = spaceAvailability.requirementsString;
      space.requirementsSyntaxTree = spaceAvailability.requirementsSyntaxTree;
    });

    lock.release();
    return worldTO;
  }

  private async loadLearningWorldFromBackend(
    userToken: string,
    worldID: number,
  ): Promise<LearningWorldEntity> {
    const [apiWorldDataResponse, apiWorldScoreResponse] = await Promise.all([
      this.backendAdapter.getWorldData({
        userToken: userToken,
        worldID: worldID,
      }),
      this.backendAdapter.getWorldStatus(userToken, worldID),
    ]);

    const spaceEntities: LearningSpaceEntity[] =
      this.createLearningSpaceEntities(
        worldID,
        apiWorldDataResponse,
        apiWorldScoreResponse,
      );

    const worldEntity = this.createLearningWorldEntity(
      worldID,
      spaceEntities,
      apiWorldDataResponse,
    );

    this.createExternalLearningElementEntities(
      apiWorldDataResponse.externalElements,
      worldID,
    );

    return worldEntity;
  }

  private createLearningSpaceEntities(
    worldID: number,
    apiWorldDataResponse: Partial<BackendWorldTO>,
    apiWorldScoreResponse: LearningWorldStatusTO,
  ): LearningSpaceEntity[] {
    const spaceEntities: LearningSpaceEntity[] = [];

    apiWorldDataResponse.spaces?.forEach((space) => {
      const elementEntities: (LearningElementEntity | null)[] = space.elements
        ? this.createLearningElementEntities(
            worldID,
            space.elements,
            apiWorldScoreResponse,
            space.templateStyle,
          )
        : [];

      spaceEntities.push(
        this.container.createEntity<LearningSpaceEntity>(
          {
            id: space.id,
            name: space.name,
            elements: elementEntities,
            description: space.description,
            goals: space.goals,
            requirements: space.requirements,
            requiredScore: space.requiredScore,
            template: space.template,
            theme: space.templateStyle,
            parentWorldID: worldID,
            storyElements: this.createStoryElementEntitiesForSpace(
              space.introStory,
              space.outroStory,
              worldID,
              space.id,
              space.templateStyle,
            ),
            gradingStyle: this.createDisplayStrategy(
              apiWorldDataResponse.gradingStyle,
            ),
          },
          LearningSpaceEntity,
        ),
      );
    });

    return spaceEntities;
  }

  private createStoryElementEntitiesForSpace(
    introStoryElement: BackendStoryTO | null,
    outroStoryElement: BackendStoryTO | null,
    worldID: number,
    spaceID: number,
    spaceTheme: LearningSpaceThemeType,
  ): StoryElementEntity[] {
    const storyElementEntities: StoryElementEntity[] = [];

    const introStoryModel = this.getStoryElementModelType(
      spaceTheme,
      introStoryElement?.elementModel,
    );
    const outroStoryModel = this.getStoryElementModelType(
      spaceTheme,
      outroStoryElement?.elementModel,
    );

    // create combined intro-outro story element if both are present and have the same model
    if (
      introStoryElement !== null &&
      outroStoryElement !== null &&
      introStoryModel === outroStoryModel
    ) {
      storyElementEntities.push(
        this.container.createEntity<StoryElementEntity>(
          {
            worldID: worldID,
            spaceID: spaceID,
            introStoryTexts: introStoryElement.storyTexts,
            outroStoryTexts: outroStoryElement.storyTexts,
            modelType: introStoryModel,
            storyType: StoryElementType.IntroOutro,
            storyNpcName: introStoryElement.storyNpcName,
            hasOutroTriggered: false,
            introEmotion: introStoryElement.facialExpression,
            outroEmotion: outroStoryElement.facialExpression,
          },
          StoryElementEntity,
        ),
      );
    } else {
      // create separate intro and outro story elements if present
      if (introStoryElement !== null) {
        storyElementEntities.push(
          this.container.createEntity<StoryElementEntity>(
            {
              worldID: worldID,
              spaceID: spaceID,
              introStoryTexts: introStoryElement.storyTexts,
              modelType: introStoryModel,
              storyType: StoryElementType.Intro,
              storyNpcName: introStoryElement.storyNpcName,
              hasOutroTriggered: null,
              introEmotion: introStoryElement.facialExpression,
              outroEmotion: null,
            },
            StoryElementEntity,
          ),
        );
      }
      if (outroStoryElement !== null) {
        storyElementEntities.push(
          this.container.createEntity<StoryElementEntity>(
            {
              worldID: worldID,
              spaceID: spaceID,
              outroStoryTexts: outroStoryElement.storyTexts,
              modelType: outroStoryModel,
              storyType: StoryElementType.Outro,
              storyNpcName: outroStoryElement.storyNpcName,
              hasOutroTriggered: false,
              introEmotion: null,
              outroEmotion: outroStoryElement.facialExpression,
            },
            StoryElementEntity,
          ),
        );
      }
    }

    return storyElementEntities;
  }

  getStoryElementModelType(
    spaceTheme: LearningSpaceThemeType,
    modelType?: LearningElementModel,
  ): LearningElementModel {
    if (
      modelType === undefined ||
      !isValidLearningElementModelType(modelType)
    ) {
      modelType = LearningSpaceThemeLookup.getLearningSpaceTheme(spaceTheme)
        .storyElementModel as LearningElementModel;
    }

    return modelType;
  }

  private createLearningElementEntities(
    worldID: number,
    elements: (BackendLearningElementTO | BackendAdaptivityElementTO | null)[],
    worldStatus: LearningWorldStatusTO,
    spaceTheme: LearningSpaceThemeType,
  ): (LearningElementEntity | null)[] {
    return elements.map((element) => {
      if (element === null) {
        return null;
      }

      // randomly assign model if not set
      if (
        element.model === undefined ||
        !isValidLearningElementModelType(element.model)
      ) {
        const elementModelsForTheme =
          LearningSpaceThemeLookup.getLearningSpaceTheme(
            spaceTheme,
          ).learningElementModels;
        const elementModelsForType =
          elementModelsForTheme[element.type as LearningElementTypes];

        const modelRandomizer = new ArrayItemRandomizer(elementModelsForType);
        element.model = modelRandomizer.getItem(element.name);
      }

      let newElementEntity: LearningElementEntity = {
        id: element.id,
        description: element.description,
        goals: element.goals,
        name: element.name,
        type: element.type,
        value: element.value || 0,
        model: element.model,
        hasScored:
          worldStatus.elements.find((e) => e.elementID === element.id)
            ?.hasScored || false,
        parentWorldID: worldID,
        isRequired: null,
        difficulty: {
          difficultyType: element.difficulty,
          multiplicator: 0,
          baseXP: 0, // Initialize baseXP
        },
      };

      newElementEntity = this.container.createEntity(
        newElementEntity,
        LearningElementEntity,
      );

      if (element instanceof BackendAdaptivityElementTO) {
        this.createAdaptivityElementEntity(
          newElementEntity,
          element.adaptivity,
        );
      }

      return newElementEntity;
    });
  }

  private createAdaptivityElementEntity(
    element: LearningElementEntity,
    adaptivityData: AdaptivityElementDataTO,
  ) {
    let entity = new AdaptivityElementEntity();
    entity = Object.assign(entity, structuredClone(adaptivityData));
    entity.element = element;
    this.container.createEntity<AdaptivityElementEntity>(
      entity,
      AdaptivityElementEntity,
    );
  }

  private createLearningWorldEntity(
    worldID: number,
    spaceEntities: LearningSpaceEntity[],
    apiWorldDataResponse: Partial<BackendWorldTO>,
  ): LearningWorldEntity {
    let narrativeFrameworkEntity: NarrativeFrameworkEntity | undefined;
    if (apiWorldDataResponse.narrativeFramework) {
      narrativeFrameworkEntity =
        this.container.createEntity<NarrativeFrameworkEntity>(
          {
            introText: apiWorldDataResponse.narrativeFramework.frameStoryIntro,
            outroText: apiWorldDataResponse.narrativeFramework.frameStoryOutro,
          },
          NarrativeFrameworkEntity,
        );
    }

    const worldEntity = this.container.createEntity<LearningWorldEntity>(
      {
        name: apiWorldDataResponse.worldName,
        spaces: spaceEntities,
        goals: apiWorldDataResponse.goals,
        id: worldID,
        description: apiWorldDataResponse.description,
        evaluationLink: apiWorldDataResponse.evaluationLink,
        narrativeFramework: narrativeFrameworkEntity,
        theme: apiWorldDataResponse.theme,
        gradingStyle: this.createDisplayStrategy(
          apiWorldDataResponse.gradingStyle,
        ),
      },
      LearningWorldEntity,
    );

    return worldEntity;
  }

  private createExternalLearningElementEntities(
    externalElements: BackendBaseElementTO[] | undefined,
    worldID: number,
  ) {
    if (externalElements === undefined || externalElements.length === 0) {
      return;
    }
    externalElements.forEach((element) => {
      this.container.createEntity<ExternalLearningElementEntity>(
        {
          id: element.id,
          worldID: worldID,
          name: element.name,
          type: element.type,
        },
        ExternalLearningElementEntity,
      );
    });
  }

  private createLearningWorldTOFromLearningWorldEntity(
    entityToConvert: LearningWorldEntity,
  ): LearningWorldTO {
    // this will need to be changed when entity and TO are not matching in structure anymore
    let worldTO = new LearningWorldTO();
    worldTO = Object.assign(worldTO, structuredClone(entityToConvert));
    // structured clone wont deep copy instantiation of an interface
    worldTO.gradingStyle = entityToConvert.gradingStyle;

    return worldTO;
  }

  private createDisplayStrategy(
    flag?: string | null,
  ): IElementCompletionDisplay {
    if (flag && flag === GradingStyle.requirement) {
      return new RequirementBasedDisplay();
    } else return new PointBasedDisplay();
  }
}
