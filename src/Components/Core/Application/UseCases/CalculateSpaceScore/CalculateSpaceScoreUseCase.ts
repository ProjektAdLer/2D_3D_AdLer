import { inject, injectable } from "inversify";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import type ISpacePort from "../../../Ports/SpacePort/ISpacePort";
import ICalculateSpaceScoreUseCase from "./ICalculateSpaceScoreUseCase";

@injectable()
export default class CalculateSpaceScoreUseCase
  implements ICalculateSpaceScoreUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entitiyContainer: IEntityContainer,
    @inject(PORT_TYPES.ISpacePort)
    private spacePort: ISpacePort
  ) {}

  execute(data: { spaceId: number }): void {
    const spaces = this.entitiyContainer.filterEntitiesOfType<SpaceEntity>(
      SpaceEntity,
      (e) => e.id === data.spaceId
    );

    if (spaces.length === 0) {
      throw new Error(`Could not find any spaces`);
    }

    // get the requested space
    const space = spaces.find((s) => s.id === data.spaceId);
    if (!space) {
      throw new Error(`Could not find space with id ${data.spaceId}`);
    }

    // sum up score
    let maxPoints = 0;
    const currentScore = space.elements.reduce((acumulator, current) => {
      maxPoints += acumulator;
      if (current.hasScored) {
        return acumulator + current.value;
      } else {
        return acumulator;
      }
    }, 0);

    this.spacePort.onScoreChanged(
      currentScore,
      space.requiredPoints,
      maxPoints,
      data.spaceId
    );
  }
}
