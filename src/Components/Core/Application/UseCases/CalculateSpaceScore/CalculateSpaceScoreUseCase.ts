import { inject, injectable } from "inversify";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import type IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import SpaceScoreTO from "../../DataTransferObjects/SpaceScoreTO";
import ICalculateSpaceScoreUseCase from "./ICalculateSpaceScoreUseCase";

@injectable()
export default class CalculateSpaceScoreUseCase
  implements ICalculateSpaceScoreUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entitiyContainer: IEntityContainer,
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort
  ) {}

  execute(spaceID: ComponentID): SpaceScoreTO {
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
    console.log(result);
    this.worldPort.onSpaceScored(result);
    return result;
  }
}
