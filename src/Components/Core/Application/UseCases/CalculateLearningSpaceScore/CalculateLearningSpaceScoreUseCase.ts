import { inject, injectable } from "inversify";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import LearningSpaceEntity from "../../../Domain/Entities/LearningSpaceEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import ICalculateLearningSpaceScoreUseCase, {
  IInternalCalculateLearningSpaceScoreUseCase,
  InternalCalculateLearningSpaceScoreUseCaseParams,
} from "./ICalculateLearningSpaceScoreUseCase";

@injectable()
export default class CalculateLearningSpaceScoreUseCase
  implements
    ICalculateLearningSpaceScoreUseCase,
    IInternalCalculateLearningSpaceScoreUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entitiyContainer: IEntityContainer,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  internalExecute({
    spaceID,
    worldID,
  }: InternalCalculateLearningSpaceScoreUseCaseParams): LearningSpaceScoreTO {
    const result = this.calculateLearningSpaceScore(spaceID, worldID);
    return result;
  }

  execute(): void {
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      throw new Error(`User is not in a space!`);
    }

    const result = this.calculateLearningSpaceScore(
      userLocation.spaceID,
      userLocation.worldID
    );

    this.worldPort.onLearningSpaceScored(result);
  }

  private calculateLearningSpaceScore(
    spaceID: ComponentID,
    worldID: ComponentID
  ): LearningSpaceScoreTO {
    const spaces =
      this.entitiyContainer.filterEntitiesOfType<LearningSpaceEntity>(
        LearningSpaceEntity,
        (e) => e.id === spaceID && e.parentWorldID === worldID
      );
    if (spaces.length === 0 || spaces.length > 1) {
      throw new Error(`Could not find matching space`);
    }
    const space = spaces[0];

    let maxPoints = 0;
    const currentScore = space.elements.reduce((acumulator, current) => {
      // skip empty element slots
      if (!current) return acumulator;

      maxPoints += current.value;
      if (current.hasScored) {
        return acumulator + current.value;
      } else {
        return acumulator;
      }
    }, 0);

    const result: LearningSpaceScoreTO = {
      spaceID: spaceID,
      currentScore: currentScore,
      requiredScore: space.requiredScore,
      maxScore: maxPoints,
    };
    return result;
  }
}
