import ICalculateTotalRoomScore from "./ICalculateTotalRoomScore";

export default class CalculateTotalRoomScore
  implements ICalculateTotalRoomScore
{
  execute(data: { roomId: number }): void {
    throw new Error("Method not implemented.");
  }
}
