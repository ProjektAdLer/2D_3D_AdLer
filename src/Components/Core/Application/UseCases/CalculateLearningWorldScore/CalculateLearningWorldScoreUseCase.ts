import { inject, injectable } from "inversify";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import ICalculateLearningWorldScoreUseCase from "./ICalculateLearningWorldScoreUseCase";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import type { IInternalCalculateLearningSpaceScoreUseCase } from "../CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";

@injectable()
export default class CalculateLearningWorldScoreUseCase
  implements ICalculateLearningWorldScoreUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entitiyContainer: IEntityContainer,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.ICalculateLearningSpaceScoreUseCase)
    private calculateSpaceScoreUseCase: IInternalCalculateLearningSpaceScoreUseCase,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  execute(): void {
    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID) {
      throw new Error(`User is not in a world!`);
    }

    const worlds =
      this.entitiyContainer.filterEntitiesOfType<LearningWorldEntity>(
        LearningWorldEntity,
        (e) => e.id === userLocation.worldID
      );

    if (worlds.length === 0) {
      throw new Error(`Could not find any worlds!`);
    }

    // get the requested space
    const world = worlds.find((s) => s.id === userLocation.worldID);
    if (!world) {
      throw new Error(`Could not find world with id ${userLocation.worldID}`);
    }

    // sum up score
    let currentScore: number = 0;
    let maxScore: number = 0;
    let requiredScore: number = 0;
    world.spaces.forEach((space) => {
      const spaceScore: LearningSpaceScoreTO =
        this.calculateSpaceScoreUseCase.internalExecute(space.id);
      currentScore += spaceScore.currentScore;
      maxScore += spaceScore.maxScore;
      requiredScore += spaceScore.requiredScore;
    });

    const result: LearningWorldScoreTO = {
      worldID: userLocation.worldID,
      currentScore: currentScore,
      requiredScore: requiredScore,
      maxScore: maxScore,
    };

    this.worldPort.onLearningWorldScored(result);
  }
}
