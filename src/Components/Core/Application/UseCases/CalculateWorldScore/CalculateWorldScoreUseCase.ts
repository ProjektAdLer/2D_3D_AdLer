import { inject, injectable } from "inversify";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import type IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import ICalculateWorldScoreUseCase from "./ICalculateWorldScoreUseCase";
import WorldScoreTO from "../../DataTransferObjects/WorldScoreTO";
import WorldEntity from "src/Components/Core/Domain/Entities/WorldEntity";
import SpaceScoreTO from "../../DataTransferObjects/SpaceScoreTO";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ICalculateSpaceScoreUseCase from "../CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";

@injectable()
export default class CalculateWorldScoreUseCase
  implements ICalculateWorldScoreUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entitiyContainer: IEntityContainer,
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(USECASE_TYPES.ICalculateSpaceScoreUseCase)
    private calculateSpaceScoreUseCase: ICalculateSpaceScoreUseCase,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  execute(): void {
    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();

    const worlds = this.entitiyContainer.filterEntitiesOfType<WorldEntity>(
      WorldEntity,
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
      const spaceScore: SpaceScoreTO = this.calculateSpaceScoreUseCase.execute(
        space.id
      );
      currentScore += spaceScore.currentScore;
      maxScore += spaceScore.maxScore;
      requiredScore += spaceScore.requiredScore;
    });

    const result: WorldScoreTO = {
      worldID: userLocation.worldID,
      currentScore: currentScore,
      requiredScore: requiredScore,
      maxScore: maxScore,
    };

    this.worldPort.onWorldScored(result);
  }
}
