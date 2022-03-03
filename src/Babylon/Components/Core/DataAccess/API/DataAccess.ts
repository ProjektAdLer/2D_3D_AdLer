import { injectable, inject } from "inversify";
import IDataAccess from "../../BusinessLogic/API/IDataAccess";
import CORE_TYPES from "../../DependencyInjection/types";
import IMoodleData from "../Moodle/IMoodleData";

@injectable()
export default class DataAccess implements IDataAccess {
  constructor(@inject(CORE_TYPES.IMoodleData) private moodleData: IMoodleData) {
    console.log("DataAccess");
  }
  async signInUser(username: string, password: string): Promise<string> {
    return await this.moodleData.signInUser("Student", "wve2rxz7wfm3BPH-ykh");
  }
}
