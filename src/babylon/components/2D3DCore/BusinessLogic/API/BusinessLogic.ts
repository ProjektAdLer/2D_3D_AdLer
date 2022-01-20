import { IBusinessLogic } from '../../../../template/PresentationLogic/API/IBusinessLogic';
import { DataAccess } from '../../DataAccess/API/DataAccess';
import { IDataAccess } from './IDataAccess';

export class BusinessLogic implements IBusinessLogic {
  // @ts-ignore
  private _dataAccess: IDataAccess;

  constructor(dataAccess?: IDataAccess) {
    this._initDataAccess(dataAccess);
  }

  private _initDataAccess(dataAccess?: IDataAccess): void {
    if (dataAccess) {
      this._dataAccess = dataAccess;
    } else {
      this._dataAccess = new DataAccess();
    }
  }
}
