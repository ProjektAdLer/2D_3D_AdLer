import { injectable } from "inversify";
import IDataAccess from "../../BusinessLogic/API/IDataAccess";

@injectable()
export default class DataAccess implements IDataAccess {
  constructor() {
    console.log("DataAccess");
  }
}
