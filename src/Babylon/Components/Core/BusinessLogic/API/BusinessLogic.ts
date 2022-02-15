import { IBusinessLogic } from "../../Presentation/API/IBusinessLogic";
import { DataAccess } from "../../DataAccess/API/DataAccess";
import { IDataAccess } from "./IDataAccess";
import { inject, injectable } from "inversify";

@injectable()
export class BusinessLogic implements IBusinessLogic {
  private _dataAccess: IDataAccess;

  constructor(@inject(DataAccess) dataAccess?: IDataAccess) {
    if (dataAccess) {
      this._dataAccess = dataAccess;
    } else {
      this._dataAccess = new DataAccess();
    }
  }
}
