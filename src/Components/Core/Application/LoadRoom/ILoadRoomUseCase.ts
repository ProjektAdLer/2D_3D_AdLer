import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import { IAsyncUsecase } from "../Abstract/IAsyncUsecase";
import LearningRoomTO from "../DataTransportObjects/LearningRoomTO";

/**
 * loads a room with given id, returns it and calls the LearningRoomPort
 * @param {LearningComponentID} roomId
 * @returns {LearningRoomTO} Transport Object of the room
 */
export default interface ILoadRoomUseCase
  extends IAsyncUsecase<LearningComponentID, LearningRoomTO> {}
