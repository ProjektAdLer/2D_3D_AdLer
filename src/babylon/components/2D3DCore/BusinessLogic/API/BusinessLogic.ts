import { IBusinessLogic } from './../../Presentation/API/IBusinessLogic';
import { DataAccess } from '../../DataAccess/API/DataAccess';
import { Calculator } from '../Calculator';
import { IDataAccess } from './IDataAccess';

export class BusinessLogic implements IBusinessLogic {
	// @ts-ignore
	private _dataAccess: IDataAccess;
	private _calculator: Calculator;

	constructor();
	constructor(dataAccess: IDataAccess, calculator: Calculator);
	constructor(dataAccess?: IDataAccess, calculator?: Calculator) {
		this._initDataAccess(dataAccess);
		this._calculator = calculator ?? new Calculator();
	}

	private _initDataAccess(dataAccess?: IDataAccess): void {
		if (dataAccess) {
			this._dataAccess = dataAccess;
		} else {
			this._dataAccess = new DataAccess();
		}
	}

	public checkInput(inputToCheck: boolean): boolean {
		return this._calculator.checkInput(inputToCheck);
	}
}
