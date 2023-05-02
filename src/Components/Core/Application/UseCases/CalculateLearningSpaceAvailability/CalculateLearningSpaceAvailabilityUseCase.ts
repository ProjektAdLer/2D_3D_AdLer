import { inject, injectable } from "inversify";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import ICalculateLearningSpaceAvailabilityUseCase from "./ICalculateLearningSpaceAvailabilityUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import LearningSpaceEntity from "src/Components/Core/Domain/Entities/LearningSpaceEntity";
import LearningSpaceAvailabilityStringParser from "./Parser/LearningSpaceAvailabilityStringParser";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceAvailabilityTO from "../../DataTransferObjects/LearningSpaceAvailabilityTO";

@injectable()
export default class CalculateLearningSpaceAvailabilityUseCase
  implements ICalculateLearningSpaceAvailabilityUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateLearningSpaceScoreUseCase: IInternalCalculateLearningSpaceScoreUseCase
  ) {}

  internalExecute(spaceID: ComponentID): LearningSpaceAvailabilityTO {
    const spaces = this.entityContainer.filterEntitiesOfType(
      LearningSpaceEntity,
      (s) => s.id === spaceID
    );
    if (spaces.length === 0 || spaces.length > 1) {
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
        this.calculateLearningSpaceScoreUseCase.internalExecute(id);

      evaluationMap.set(
        id,
        requiredSpaceScore.currentScore >= requiredSpaceScore.requiredScore
      );
    });

    return {
      requirementsString: space.requirements,
      requirementsSyntaxTree: requirementsSyntaxTree,
      isAvailable: requirementsSyntaxTree.evaluate(evaluationMap),
    };
  }
}
