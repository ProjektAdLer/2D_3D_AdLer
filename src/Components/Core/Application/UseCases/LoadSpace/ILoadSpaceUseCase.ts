import { ElementID } from "../../../Domain/Types/EntityTypes";
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";
import SpaceTO from "../../DataTransferObjects/SpaceTO";

/**
 * loads a room with given id, returns it and calls the LearningRoomPort
 * @param {ElementID} spaceId
 * @returns {SpaceTO} Transfer Object of the room
 */
export default interface ILoadSpaceUseCase
  extends IAsyncUsecase<ElementID, SpaceTO> {
  executeAsync(spaceId: ElementID): Promise<SpaceTO>;
}
