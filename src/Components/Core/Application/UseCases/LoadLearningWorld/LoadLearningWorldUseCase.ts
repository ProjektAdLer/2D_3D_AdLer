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
import type IUIPort from "../../Ports/Interfaces/IUIPort";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import { Semaphore } from "src/Lib/Semaphore";
import LearningWorldStatusTO from "../../DataTransferObjects/LearningWorldStatusTO";
import { logger } from "src/Lib/Logger";
import type ISetUserLocationUseCase from "../SetUserLocation/ISetUserLocationUseCase";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import BackendWorldTO from "../../DataTransferObjects/BackendWorldTO";
import BackendElementTO from "../../DataTransferObjects/BackendElementTO";
import type ICalculateLearningSpaceAvailabilityUseCase from "../CalculateLearningSpaceAvailability/ICalculateLearningSpaceAvailabilityUseCase";

@injectable()
export default class LoadLearningWorldUseCase
  implements ILoadLearningWorldUseCase
{
  constructor(
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
    @inject(PORT_TYPES.IUIPort)
    private uiPort: IUIPort,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScore: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(USECASE_TYPES.ISetUserLocationUseCase)
    private setUserLocationUseCase: ISetUserLocationUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase)
    private calculateSpaceAvailabilityUseCase: ICalculateLearningSpaceAvailabilityUseCase
  ) {}

  private semaphore = new Semaphore("LoadWorld in Use", 1);

  async executeAsync(data: { worldID: number }): Promise<void> {
    const lock = await this.semaphore.acquire();

    // check if user is logged in
    const userData = this.container.getEntitiesOfType(UserDataEntity);
    if (userData.length === 0 || userData[0]?.isLoggedIn === false) {
      this.uiPort.displayNotification("User is not logged in!", "error");
      logger.error("User is not logged in!");
      return Promise.reject("User is not logged in");
    }

    // check if world is available to user
    if (
      userData[0].availableWorlds.find(
        (world) => world.worldID === data.worldID
      ) === undefined
    ) {
      this.uiPort.displayNotification("World is not available!", "error");
      logger.error("World is not available!");
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

    // set user location
    this.setUserLocationUseCase.execute({ worldID: data.worldID });

    this.worldPort.onLearningWorldLoaded(worldTO);

    lock.release();
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
            apiWorldScoreResponse
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
          },
          LearningSpaceEntity
        )
      );
    });

    return spaceEntities;
  }

  private createLearningElementEntities = (
    worldID: number,
    elements: (BackendElementTO | null)[],
    worldStatus: LearningWorldStatusTO
  ): (LearningElementEntity | null)[] => {
    return elements.map((element) => {
      if (element === null) return null;

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

      return newElementEntity;
    });
  };

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
}
