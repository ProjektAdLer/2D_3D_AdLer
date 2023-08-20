import { inject, injectable } from "inversify";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import ICalculateLearningSpaceAvailabilityUseCase, {
  InternalCalculateLearningSpaceAvailabilityUseCaseParams,
} from "./ICalculateLearningSpaceAvailabilityUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import LearningSpaceEntity from "src/Components/Core/Domain/Entities/LearningSpaceEntity";
import LearningSpaceAvailabilityStringParser from "./Parser/LearningSpaceAvailabilityStringParser";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceAvailabilityTO from "../../DataTransferObjects/LearningSpaceAvailabilityTO";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
@injectable()
export default class CalculateLearningSpaceAvailabilityUseCase
  implements ICalculateLearningSpaceAvailabilityUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateLearningSpaceScoreUseCase: IInternalCalculateLearningSpaceScoreUseCase
  ) {}

  internalExecute({
    spaceID,
    worldID,
  }: InternalCalculateLearningSpaceAvailabilityUseCaseParams): LearningSpaceAvailabilityTO {
    const spaces = this.entityContainer.filterEntitiesOfType(
      LearningSpaceEntity,
      (s) => s.id === spaceID && s.parentWorldID === worldID
    );
    if (spaces.length === 0 || spaces.length > 1) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `CalculateLearningSpaceAvailabilityUseCase: Space ${spaceID} not found!`
      );
      throw new Error(`Could not find space with id ${spaceID}`);
    }
    const space = spaces[0];

    // if the space has no requirements, it is always available
    if (space.requirements === "")
      return {
        requirementsString: "",
        requirementsSyntaxTree: null,
        isAvailable: true,
      };

    const requirementsSyntaxTree =
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree(
        space.requirements
      );

    const requirementsIdArray =
      LearningSpaceAvailabilityStringParser.parseToIdArray(space.requirements);

    const evaluationMap = new Map<ComponentID, boolean>();
    requirementsIdArray.forEach((id) => {
      const requiredSpaceScore: LearningSpaceScoreTO =
        this.calculateLearningSpaceScoreUseCase.internalExecute({
          spaceID: id,
          worldID: worldID,
        });

      evaluationMap.set(
        id,
        requiredSpaceScore.currentScore >= requiredSpaceScore.requiredScore
      );
    });

    this.logger.log(
      LogLevelTypes.TRACE,
      `CalculateLearningSpaceAvailabilityUseCase: InternalExecute, SpaceID: ${spaceID}, WorldID: ${worldID}."`
    );

    return {
      requirementsString: space.requirements,
      requirementsSyntaxTree: requirementsSyntaxTree,
      isAvailable: requirementsSyntaxTree.evaluate(evaluationMap),
    };
  }
}
