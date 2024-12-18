import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

/**
 * loads a room with given id, returns it and calls the LearningRoomPort
 * @param {ComponentID} spaceID
 * @param {ComponentID} worldID
 * @returns {SpaceTO} Transfer Object of the room
 */
export default interface ILoadLearningSpaceUseCase
  extends IAsyncUsecase<{ spaceID: ComponentID; worldID: ComponentID }, void> {}
