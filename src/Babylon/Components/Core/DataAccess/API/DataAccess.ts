import { injectable } from "inversify";
import { IDataAccess } from "../../BusinessLogic/API/IDataAccess";

@injectable()
export class DataAccess implements IDataAccess {
  constructor() {}
}
