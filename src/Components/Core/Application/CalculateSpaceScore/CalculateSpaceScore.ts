import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import SpaceEntity from "../../Domain/Entities/SpaceEntity";
import type IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import type ISpacePort from "../../Ports/SpacePort/ISpacePort";
import ICalculateSpaceScore from "./ICalculateSpaceScore";

@injectable()
export default class CalculateSpaceScore implements ICalculateSpaceScore {
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
      throw new Error(`Could not find space with id ${data.spaceId}`);
    }

    const space = spaces[0];

    const spaceScore = space.elements.reduce((acumulator, current) => {
      if (current.hasScored) {
        return acumulator + current.value;
      } else {
        return acumulator;
      }
    }, 0);

    // TODO: This has to be more refined
    this.spacePort.presentNewScore(spaceScore, spaceScore >= 20, data.spaceId);
  }
}
