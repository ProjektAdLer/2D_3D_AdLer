import { inject, injectable } from "inversify";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import ICalculateLearningSpaceAvailabilityUseCase from "./ICalculateLearningSpaceAvailabilityUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import LearningSpaceEntity from "src/Components/Core/Domain/Entities/LearningSpaceEntity";
import LearningRoomAvailabilityStringParser from "./Parser/LearningRoomAvailabilityStringParser";
import { logger } from "src/Lib/Logger";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import { BooleanNode } from "./Parser/BooleanSyntaxTree";

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

  internalExecute(spaceID: ComponentID): boolean {
    const spaces = this.entityContainer.filterEntitiesOfType(
      LearningSpaceEntity,
      (s) => s.id === spaceID
    );
    if (spaces.length === 0 || spaces.length > 1) {
      throw new Error(`Could not find space with id ${spaceID}`);
    }
    const space = spaces[0];

    let requirementsSyntaxTree: BooleanNode;
    try {
      requirementsSyntaxTree =
        LearningRoomAvailabilityStringParser.parseToSyntaxTree(
          space.requirements
        );
    } catch (e) {
      logger.error(e);
      return false;
    }

    const requirementsIdArray =
      LearningRoomAvailabilityStringParser.parseToIdArray(space.requirements);

    const evaluationMap = new Map<ComponentID, boolean>();
    requirementsIdArray.forEach((id) => {
      const requiredSpaceScore: LearningSpaceScoreTO =
        this.calculateLearningSpaceScoreUseCase.internalExecute(id);

      evaluationMap.set(
        id,
        requiredSpaceScore.currentScore > requiredSpaceScore.requiredScore
      );
    });

    return requirementsSyntaxTree!.evaluate(evaluationMap);
  }
}
