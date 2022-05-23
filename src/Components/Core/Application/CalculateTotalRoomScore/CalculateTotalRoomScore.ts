import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import LearningRoomEntity from "../../Domain/Entities/LearningRoomEntity";
import IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import ILearningRoomPort from "./ILearningRoomPort";
import ICalculateTotalRoomScore from "./ICalculateTotalRoomScore";

@injectable()
export default class CalculateTotalRoomScore
  implements ICalculateTotalRoomScore
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entitiyContainer: IEntityContainer,
    @inject(PORT_TYPES.ILearningRoomPort)
    private learningRoomPort: ILearningRoomPort
  ) {}

  execute(data: { roomId: number }): void {
    const room = this.entitiyContainer.filterEntitiesOfType<LearningRoomEntity>(
      LearningRoomEntity,
      (e) => e.id === data.roomId
    )[0];

    if (!room) throw new Error(`Could not find room with id ${data.roomId}`);

    const roomScore = room.learningElements.reduce((acumulator, current) => {
      if (current.hasScored) {
        return acumulator + current.value;
      } else {
        return acumulator;
      }
    }, 0);

    // TODO: This has to be more refined
    this.learningRoomPort.presentNewScore(
      roomScore,
      roomScore >= 20,
      data.roomId
    );
  }
}
