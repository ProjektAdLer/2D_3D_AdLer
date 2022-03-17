import { injectable } from "inversify";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IRoomFactory from "./IRoomFactory";
import IRoomPresenter from "./IRoomPresenter";

@injectable()
export default class RoomFactory implements IRoomFactory {
  createRoom(): IRoomPresenter {
    let roomPresenter = CoreDIContainer.get<IRoomPresenter>(
      CORE_TYPES.IRoomPresenter
    );
    roomPresenter.createFloor();
    roomPresenter.createWalls();
    return roomPresenter;
  }
}
