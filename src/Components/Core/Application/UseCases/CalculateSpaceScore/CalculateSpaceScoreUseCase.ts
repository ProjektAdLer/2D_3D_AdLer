import { inject, injectable } from "inversify";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import type IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import SpaceScoreTO from "../../DataTransferObjects/SpaceScoreTO";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import ICalculateSpaceScoreUseCase, {
  IInternalCalculateSpaceScoreUseCase,
} from "./ICalculateSpaceScoreUseCase";

@injectable()
export default class CalculateSpaceScoreUseCase
  implements ICalculateSpaceScoreUseCase, IInternalCalculateSpaceScoreUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entitiyContainer: IEntityContainer,
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  internalExecute(spaceID: ComponentID): SpaceScoreTO {
    return this.calculateSpaceScore(spaceID);
  }

  execute(): void {
    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      throw new Error(`User is not in a space!`);
    }

    const result = this.calculateSpaceScore(userLocation.spaceID);

    this.worldPort.onSpaceScored(result);
  }

  private calculateSpaceScore(spaceID: ComponentID): SpaceScoreTO {
    const spaces = this.entitiyContainer.filterEntitiesOfType<SpaceEntity>(
      SpaceEntity,
      (e) => e.id === spaceID
    );

    if (spaces.length === 0) {
      throw new Error(`Could not find any spaces`);
    }

    // get the requested space
    const space = spaces.find((s) => s.id === spaceID);
    if (!space) {
      throw new Error(`Could not find space with id ${spaceID}`);
    }

    // sum up score
    let maxPoints = 0;
    const currentScore = space.elements.reduce((acumulator, current) => {
      maxPoints += current.value;
      if (current.hasScored) {
        return acumulator + current.value;
      } else {
        return acumulator;
      }
    }, 0);

    const result: SpaceScoreTO = {
      spaceID: spaceID,
      currentScore: currentScore,
      requiredScore: space.requiredScore,
      maxScore: maxPoints,
    };
    return result;
  }
}
