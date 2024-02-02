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
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
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
import { isValidLearningElementModelType } from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";
import StoryElementEntity from "src/Components/Core/Domain/Entities/StoryElementEntity";
import BackendStoryTO from "../../DataTransferObjects/BackendStoryTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

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
    private calculateSpaceAvailabilityUseCase: ICalculateLearningSpaceAvailabilityUseCase
  ) {}

  private semaphore = new Semaphore("LoadWorld in Use", 1);

  async internalExecuteAsync(data: {
    worldID: number;
  }): Promise<LearningWorldTO> {
    const lock = await this.semaphore.acquire();
    const loadedWorld = await this.loadWorld(data, lock);

    this.logger.log(
      LogLevelTypes.TRACE,
      "LoadLearningWorldUseCase (internalExecuteAsync): Loaded world and cumulated space scores."
    );
    return loadedWorld;
  }

  async executeAsync(data: { worldID: number }): Promise<void> {
    const lock = await this.semaphore.acquire();
    const loadedWorlds = await this.loadWorld(data, lock);

    this.setUserLocationUseCase.execute({ worldID: data.worldID });

    this.logger.log(
      LogLevelTypes.TRACE,
      "LoadLearningWorldUseCase (executeAsync): Loaded world and cumulated space scores."
    );
    this.worldPort.onLearningWorldLoaded(loadedWorlds);
  }

  async loadWorld(
    data: { worldID: number },
    lock: any
  ): Promise<LearningWorldTO> {
    // check if user is logged in
    const userData = this.container.getEntitiesOfType(UserDataEntity);
    if (userData.length === 0 || userData[0]?.isLoggedIn === false) {
      this.notificationPort.displayNotification(
        "User is not logged in!",
        "error"
      );
      this.logger.log(
        LogLevelTypes.ERROR,
        "LoadLearningWorldUseCase: User is not logged in!"
      );
      lock.release();
      return Promise.reject("User is not logged in");
    }

    // check if world is available to user
    if (
      userData[0].availableWorlds.find(
        (world) => world.worldID === data.worldID
      ) === undefined
    ) {
      this.notificationPort.displayNotification(
        "World is not available!",
        "error"
      );
      this.logger.log(
        LogLevelTypes.ERROR,
        "LoadLearningWorldUseCase: World is not available!"
      );
      lock.release();
      return Promise.reject("World is not available");
    }

    // search for world entity with given ID in all world entities
    let worldEntity = this.container.filterEntitiesOfType(
      LearningWorldEntity,
      (WorldEntity) => WorldEntity.id === data.worldID
    )[0];

    // if world entity does not exist, load it from backend
    if (!worldEntity) {
      worldEntity = await this.loadLearningWorld(
        userData[0].userToken,
        data.worldID
      );
    }

    let worldTO =
      this.createLearningWorldTOFromLearningWorldEntity(worldEntity);

    // cumulate element scores for each space
    worldTO.spaces.forEach((space) => {
      let spaceScores = this.calculateSpaceScore.internalExecute({
        spaceID: space.id,
        worldID: worldEntity.id,
      });
      space.currentScore = spaceScores.currentScore;
      space.maxScore = spaceScores.maxScore;

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

  private async loadLearningWorld(
    userToken: string,
    worldID: number
  ): Promise<LearningWorldEntity> {
    const [apiWorldDataResponse, apiWorldScoreResponse] =
      await this.loadLearningWorldDataFromBackend(userToken, worldID);

    const spaceEntities: LearningSpaceEntity[] =
      this.createLearningSpaceEntities(
        worldID,
        apiWorldDataResponse,
        apiWorldScoreResponse
      );

    const worldEntity = this.createLearningWorldEntity(
      worldID,
      spaceEntities,
      apiWorldDataResponse
    );

    this.createExternalLearningElementEntities(
      apiWorldDataResponse.externalElements,
      worldID
    );

    return worldEntity;
  }

  private async loadLearningWorldDataFromBackend(
    userToken: string,
    worldID: ComponentID
  ): Promise<[Partial<BackendWorldTO>, LearningWorldStatusTO]> {
    const [apiWorldDataResponse, apiWorldScoreResponse] = await Promise.all([
      this.backendAdapter.getWorldData({
        userToken: userToken,
        worldID: worldID,
      }),
      this.backendAdapter.getWorldStatus(userToken, worldID),
    ]);

    return [apiWorldDataResponse, apiWorldScoreResponse];
  }

  private createLearningSpaceEntities(
    worldID: number,
    apiWorldDataResponse: Partial<BackendWorldTO>,
    apiWorldScoreResponse: LearningWorldStatusTO
  ): LearningSpaceEntity[] {
    const spaceEntities: LearningSpaceEntity[] = [];

    apiWorldDataResponse.spaces?.forEach((space) => {
      const elementEntities: (LearningElementEntity | null)[] = space.elements
        ? this.createLearningElementEntities(
            worldID,
            space.elements,
            apiWorldScoreResponse,
            space.templateStyle
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
              space.id
            ),
          },
          LearningSpaceEntity
        )
      );
    });

    return spaceEntities;
  }

  private createStoryElementEntitiesForSpace(
    introStoryElement: BackendStoryTO | null,
    outroStoryElement: BackendStoryTO | null,
    worldID: number,
    spaceID: number
  ): StoryElementEntity[] {
    let storyElementEntities: StoryElementEntity[] = [];

    // create combined intro-outro story element if both are present and have the same model
    if (
      introStoryElement !== null &&
      outroStoryElement !== null &&
      introStoryElement.elementModel === outroStoryElement.elementModel
    ) {
      storyElementEntities.push(
        this.container.createEntity<StoryElementEntity>(
          {
            worldID: worldID,
            spaceID: spaceID,
            introStoryTexts: introStoryElement.storyTexts,
            outroStoryTexts: outroStoryElement.storyTexts,
            modelType: introStoryElement.elementModel,
            storyType: StoryElementType.IntroOutro,
          },
          StoryElementEntity
        )
      );
    }

    // create separate intro and outro story elements if present
    if (introStoryElement !== null) {
      storyElementEntities.push(
        this.container.createEntity<StoryElementEntity>(
          {
            worldID: worldID,
            spaceID: spaceID,
            introStoryTexts: introStoryElement.storyTexts,
            modelType: introStoryElement.elementModel,
            storyType: StoryElementType.Intro,
          },
          StoryElementEntity
        )
      );
    }
    if (outroStoryElement !== null) {
      storyElementEntities.push(
        this.container.createEntity<StoryElementEntity>(
          {
            worldID: worldID,
            spaceID: spaceID,
            outroStoryTexts: outroStoryElement.storyTexts,
            modelType: outroStoryElement.elementModel,
            storyType: StoryElementType.Outro,
          },
          StoryElementEntity
        )
      );
    }

    return storyElementEntities;
  }

  private createLearningElementEntities(
    worldID: number,
    elements: (BackendLearningElementTO | BackendAdaptivityElementTO | null)[],
    worldStatus: LearningWorldStatusTO,
    spaceTheme: LearningSpaceThemeType
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
            spaceTheme
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
      };

      newElementEntity = this.container.createEntity<LearningElementEntity>(
        newElementEntity,
        LearningElementEntity
      );

      if (element instanceof BackendAdaptivityElementTO) {
        if (element.adaptivity !== undefined) {
          this.createAdaptivityElementEntity(
            newElementEntity,
            element.adaptivity
          );
        } else {
          this.logger.log(
            LogLevelTypes.ERROR,
            "LoadLearningWorldUseCase: No Adaptivity-Data found!"
          );
        }
      }

      return newElementEntity;
    });
  }

  private createAdaptivityElementEntity(
    element: LearningElementEntity,
    adaptivityData: AdaptivityElementDataTO
  ) {
    let adaptivityElement = this.toAdaptivityEntity(adaptivityData);
    adaptivityElement.element = element;
    this.container.createEntity<AdaptivityElementEntity>(
      adaptivityElement,
      AdaptivityElementEntity
    );
  }

  private toAdaptivityEntity(
    data: AdaptivityElementDataTO
  ): AdaptivityElementEntity {
    let entity = new AdaptivityElementEntity();
    entity = Object.assign(entity, structuredClone(data));
    return entity;
  }

  private createLearningWorldEntity(
    worldID: number,
    spaceEntities: LearningSpaceEntity[],
    apiWorldDataResponse: Partial<BackendWorldTO>
  ): LearningWorldEntity {
    const worldEntity = this.container.createEntity<LearningWorldEntity>(
      {
        name: apiWorldDataResponse.worldName,
        spaces: spaceEntities,
        goals: apiWorldDataResponse.goals,
        id: worldID,
        description: apiWorldDataResponse.description,
        evaluationLink: apiWorldDataResponse.evaluationLink,
      },
      LearningWorldEntity
    );

    return worldEntity;
  }

  private createLearningWorldTOFromLearningWorldEntity(
    entityToConvert: LearningWorldEntity
  ): LearningWorldTO {
    // this will need to be changed when entity and TO are not matching in structure anymore
    let worldTO = new LearningWorldTO();
    worldTO = Object.assign(worldTO, structuredClone(entityToConvert));

    return worldTO;
  }

  private createExternalLearningElementEntities(
    externalElements: BackendBaseElementTO[] | undefined,
    worldID: number
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
        ExternalLearningElementEntity
      );
    });
  }
}
