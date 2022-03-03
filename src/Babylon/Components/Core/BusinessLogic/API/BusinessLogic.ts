import IBusinessLogic from "../../Presentation/API/IBusinessLogic";
import IDataAccess from "./IDataAccess";
import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/types";
import IRoomConfigurator from "../RoomConfigurator/IRoomConfigurator";
import { ROOMSIZE } from "../RoomConfigurator/RoomConfigurator";
import IMoodle from "../Moodle/IMoodle";

@injectable()
export default class BusinessLogic implements IBusinessLogic {
  private dataAccess: IDataAccess;
  private roomConfigurator: IRoomConfigurator;
  private moodleBS: IMoodle;

  constructor(
    @inject(CORE_TYPES.IDataAccess) dataAccess: IDataAccess,
    @inject(CORE_TYPES.IRoomConfigurator) roomConfigurator: IRoomConfigurator,
    @inject(CORE_TYPES.IMoodle) moodle: IMoodle
  ) {
    this.dataAccess = dataAccess;
    this.roomConfigurator = roomConfigurator;
    this.moodleBS = moodle;

    console.log("BusinessLogic");
  }

  get RoomSize(): ROOMSIZE {
    return this.roomConfigurator.RoomSize;
  }

  async setupMooodle(): Promise<void> {
    await this.moodleBS.setupMoodle();
  }
}
