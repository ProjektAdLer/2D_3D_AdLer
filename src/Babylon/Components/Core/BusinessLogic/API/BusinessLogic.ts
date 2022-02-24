import IBusinessLogic from "../../Presentation/API/IBusinessLogic";
import IDataAccess from "./IDataAccess";
import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/types";
import IRoomConfigurator from "../RoomConfigurator/IRoomConfigurator";

@injectable()
export default class BusinessLogic implements IBusinessLogic {
  private dataAccess: IDataAccess;
  private roomConfigurator: IRoomConfigurator;

  constructor(
    @inject(CORE_TYPES.IDataAccess) dataAccess?: IDataAccess,
    @inject(CORE_TYPES.IRoomConfigurator) roomConfigurator?: IRoomConfigurator
  ) {
    console.log("BusinessLogic");
  }
  getRoomSize() {
    return this.roomConfigurator.RoomSize;
  }
}
