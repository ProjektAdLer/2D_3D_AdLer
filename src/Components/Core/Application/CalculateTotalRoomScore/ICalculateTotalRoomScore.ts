import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import { ISynchronousUsecase } from "./../Abstract/ISynchronousUsecase";
export default interface ICalculateTotalRoomScore extends ISynchronousUsecase {
  execute(data: { roomId: LearningComponentID }): void;
}
