import { inject, injectable } from "inversify";
import IBusinessLogic from "../../PresentationLogic/API/IBusinessLogic";
import DataAccess from "../../DataAccess/API/DataAccess";
import IDataAccess from "./IDataAccess";

@injectable()
export default class BusinessLogic implements IBusinessLogic {
  private dataAccess: IDataAccess;

  constructor(@inject(DataAccess) dataAccess?: IDataAccess) {}
}
