import { BusinessLogic } from '../../BusinessLogic/API/BusinessLogic';
import { IBusinessLogic } from './IBusinessLogic';
import { IPresentationLogic } from './IPresentationLogic';
export class PresentationLogic implements IPresentationLogic {
	// @ts-ignore
	private _businessLogic: IBusinessLogic;

	constructor(businessLogic?: IBusinessLogic) {
		this._initBusinessLogic(businessLogic);
	}

	private _initBusinessLogic(businessLogic?: IBusinessLogic): void {
		if (businessLogic) {
			this._businessLogic = businessLogic;
		} else {
			this._businessLogic = new BusinessLogic();
		}
	}

	public checkInput(inputToCheck: boolean): boolean {
		return this._businessLogic.checkInput(inputToCheck);
	}
}
