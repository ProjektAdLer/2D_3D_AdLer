import IBusinessLogic from "../../Presentation/API/IBusinessLogic";
import IDataAccess from "./IDataAccess";
import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/types";

@injectable()
export default class BusinessLogic implements IBusinessLogic {
  private dataAccess: IDataAccess;

  constructor(@inject(CORE_TYPES.IDataAccess) dataAccess?: IDataAccess) {
    console.log("BusinessLogic");
  }
}
