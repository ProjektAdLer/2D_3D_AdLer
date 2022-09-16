import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import { ISynchronousUsecase } from "./../Abstract/ISynchronousUsecase";
export default interface ICalculateTotalRoomScore
  extends ISynchronousUsecase<{ roomId: LearningComponentID }> {
  execute(data: { roomId: LearningComponentID }): void;
}
