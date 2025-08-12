import { inject, injectable } from "inversify";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import LearningSpaceEntity from "src/Components/Core/Domain/Entities/LearningSpaceEntity";
import IGetLearningSpacePrecursorAndSuccessorUseCase from "./IGetLearningSpacePrecursorAndSuccessorUseCase";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";
import LearningSpaceAvailabilityStringParser from "src/Components/Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/LearningSpaceAvailabilityStringParser";
import LearningSpacePrecursorAndSuccessorTO from "../../DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "src/Components/Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import type ICalculateLearningSpaceAvailabilityUseCase from "../CalculateLearningSpaceAvailability/ICalculateLearningSpaceAvailabilityUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import { NotificationMessages } from "src/Components/Core/Domain/Types/NotificationMessages";

@injectable()
export default class GetLearningSpacePrecursorAndSuccessorUseCase
  implements IGetLearningSpacePrecursorAndSuccessorUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScore: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase)
    private calculateSpaceAvailabilityUseCase: ICalculateLearningSpaceAvailabilityUseCase,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
  ) {}

  execute(): LearningSpacePrecursorAndSuccessorTO {
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      this.logger.log(
        LogLevelTypes.WARN,
        `GetLearningSpacePrecursorAndSuccessorUseCase: User is not logged in!`,
      );
      return { precursorSpaces: [], successorSpaces: [], availableSpaces: [] };
    }

    // Load current world data
    const worldEntity = this.entityContainer
      .getEntitiesOfType(LearningWorldEntity)
      .find((world) => world.id === userLocation.worldID);
    if (!worldEntity) {
      this.logger.log(
        LogLevelTypes.WARN,
        `GetLearningSpacePrecursorAndSuccessorUseCase: World ${userLocation.worldID} not found!`,
      );
      return { precursorSpaces: [], successorSpaces: [], availableSpaces: [] };
    }

    // Load current space data
    const currentSpace = worldEntity.spaces.find(
      (space) => space.id === userLocation.spaceID,
    );
    if (!currentSpace) {
      this.logger.log(
        LogLevelTypes.WARN,
        `GetLearningSpacePrecursorAndSuccessorUseCase: Space ${userLocation.spaceID} not found!`,
      );
      return { precursorSpaces: [], successorSpaces: [], availableSpaces: [] };
    }

    //Determine precursor room IDs
    const precursorSpaceIDs =
      LearningSpaceAvailabilityStringParser.parseToIdArray(
        currentSpace.requirements,
      );

    //Load precursor rooms and push them into the precursorSpaces array
    let precursorSpaces: LearningSpaceTO[] = [];
    precursorSpaceIDs.forEach((id) => {
      const matchingSpaceEntity = worldEntity.spaces.find(
        (space) => space.id === id,
      );
      if (matchingSpaceEntity) {
        let spaceTO = this.toTO(matchingSpaceEntity);
        precursorSpaces.push(spaceTO);
      }
    });
    precursorSpaces = this.fillSpaceWithScoringAndAvailabilityData(
      precursorSpaces,
      worldEntity.id,
    );

    //Determine successorSpaces and push them into the successorSpaces array
    const successorSpaceEntities = worldEntity.spaces.filter((space) =>
      LearningSpaceAvailabilityStringParser.parseToIdArray(
        space.requirements,
      ).includes(userLocation.spaceID!),
    );
    let successorSpaces: LearningSpaceTO[] = [];
    successorSpaceEntities.forEach((spaceEntity) => {
      let spaceTO = this.toTO(spaceEntity);
      successorSpaces.push(spaceTO);
    });
    successorSpaces = this.fillSpaceWithScoringAndAvailabilityData(
      successorSpaces,
      worldEntity.id,
    );

    let allSpaces: LearningSpaceTO[] = [];
    worldEntity.spaces.forEach((space) => {
      let spaceTO = this.toTO(space);
      allSpaces.push(spaceTO);
    });
    const spaces = this.fillSpaceWithScoringAndAvailabilityData(
      allSpaces,
      worldEntity.id,
    );

    let successerPrecoursors: number[] = [];
    if (successorSpaces.every((space) => space.isAvailable === false)) {
      console.log("every successor is not available");
      // successorSpaces.forEach((space) => {
      //   let ids = LearningSpaceAvailabilityStringParser.parseToIdArray(
      //     space.requirementsString,
      //   );
      //   ids = ids.filter((id) => {
      //     return id !== currentSpace.id;
      //   });
      //   console.log("filtered ids: ", ids);
      //   successerPrecoursors = successerPrecoursors.concat(ids);
      // });
    }

    let availableSpaces: LearningSpaceTO[] = [];
    availableSpaces = spaces.filter((space) => {
      return (
        space.isAvailable &&
        space.currentScore < space.requiredScore &&
        space.id !== currentSpace.id &&
        successorSpaces.some((s) => s.id === space.id) === false // removes successor spaces from available spaces (removes displaying duplicates)
      );
    });

    console.log("Precursor Spaces: ", precursorSpaces);
    console.log("Successor Spaces: ", successorSpaces);
    console.log("available Spaces: ", availableSpaces);
    console.log("SP Spaces: ", successerPrecoursors);

    const returnValue = {
      precursorSpaces: precursorSpaces,
      successorSpaces: successorSpaces,
      availableSpaces: availableSpaces,
    } as LearningSpacePrecursorAndSuccessorTO;

    this.worldPort.onLearningSpacePrecursorAndSuccessorLoaded(returnValue);
    this.logger.log(
      LogLevelTypes.TRACE,
      `GetLearningSpacePrecursorAndSuccessorUseCase: Loaded precursor and successor spaces.`,
    );
    return returnValue;
  }

  private toTO(spaceEntity: LearningSpaceEntity): LearningSpaceTO {
    let spaceTO = new LearningSpaceTO();
    spaceTO = Object.assign(spaceTO, structuredClone(spaceEntity));
    return spaceTO;
  }

  private fillSpaceWithScoringAndAvailabilityData(
    spaces: LearningSpaceTO[],
    worldID: ComponentID,
  ): LearningSpaceTO[] {
    spaces.forEach((spaceTO) => {
      try {
        const spaceScoreTO = this.calculateSpaceScore.internalExecute({
          spaceID: spaceTO.id,
          worldID: worldID,
        });
        spaceTO.currentScore = spaceScoreTO.currentScore;
        spaceTO.maxScore = spaceScoreTO.maxScore;
      } catch (e) {
        this.notificationPort.onNotificationTriggered(
          LogLevelTypes.ERROR,
          `Error while calculating space score for space ${spaceTO.id}. ${e}`,
          NotificationMessages.SPACE_SCORING_FAILED,
        );
      }

      // fill with availability data
      const availabilityData =
        this.calculateSpaceAvailabilityUseCase.internalExecute({
          spaceID: spaceTO.id,
          worldID: worldID,
        });
      spaceTO.requirementsString = availabilityData.requirementsString;
      spaceTO.requirementsSyntaxTree = availabilityData.requirementsSyntaxTree;
      spaceTO.isAvailable = availabilityData.isAvailable;
    });
    return spaces;
  }
}
