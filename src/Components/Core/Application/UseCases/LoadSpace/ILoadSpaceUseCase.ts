import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

/**
 * loads a room with given id, returns it and calls the LearningRoomPort
 * @param {ComponentID} spaceId
 * @returns {SpaceTO} Transfer Object of the room
 */
export default interface ILoadSpaceUseCase
  extends IAsyncUsecase<{ spaceID: ComponentID; worldID: ComponentID }, void> {}
