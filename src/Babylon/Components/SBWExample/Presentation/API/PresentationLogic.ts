import { inject, injectable } from 'inversify';
import { BusinessLogic } from '../../BusinessLogic/API/BusinessLogic';
import { IBusinessLogic } from './IBusinessLogic';
import { IPresentationLogic } from './IPresentationLogic';

@injectable()
export class PresentationLogic implements IPresentationLogic {
	private _businessLogic: IBusinessLogic;

	constructor(@inject(BusinessLogic) businessLogic: BusinessLogic) {
		this._businessLogic = businessLogic;
	}

	public checkInput(inputToCheck: boolean): boolean {
		return this._businessLogic.checkInput(inputToCheck);
	}
}
