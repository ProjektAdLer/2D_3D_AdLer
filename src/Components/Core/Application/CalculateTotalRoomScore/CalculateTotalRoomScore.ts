import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import LearningRoomEntity from "../../Domain/Entities/LearningRoomEntity";
import type IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import type ILearningRoomPort from "../../Ports/LearningRoomPort/ILearningRoomPort";
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
    const rooms =
      this.entitiyContainer.filterEntitiesOfType<LearningRoomEntity>(
        LearningRoomEntity,
        (e) => e.id === data.roomId
      );

    if (rooms.length === 0) {
      throw new Error(`Could not find room with id ${data.roomId}`);
    }

    const room = rooms[0];

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
