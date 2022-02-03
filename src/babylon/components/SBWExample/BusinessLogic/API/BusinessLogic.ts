import { IBusinessLogic } from '../../Presentation/API/IBusinessLogic';
import { DataAccess } from '../../DataAccess/API/DataAccess';
import { Calculator } from '../Calculator';
import { IDataAccess } from './IDataAccess';
import { injectable, inject } from 'inversify';

@injectable()
export class BusinessLogic implements IBusinessLogic {
	// @ts-ignore
	private _dataAccess: IDataAccess;
	private _calculator: Calculator;

	constructor(
		@inject(DataAccess) dataAccess: DataAccess,
		@inject(Calculator) calculator: Calculator
	) {
		this._dataAccess = dataAccess;
		this._calculator = calculator;
	}

	public checkInput(inputToCheck: boolean): boolean {
		return this._calculator.checkInput(inputToCheck);
	}
}
