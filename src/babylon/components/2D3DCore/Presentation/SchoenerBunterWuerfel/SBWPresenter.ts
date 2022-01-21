import { IPresentationLogic } from './../API/IPresentationLogic';
import { SBWViewModel } from './SBWViewModel';
export class SBWPresenter {
	private _presentationLogic: IPresentationLogic;
	private _viewModel: SBWViewModel;

	constructor(presentationLogic: IPresentationLogic) {
		this._presentationLogic = presentationLogic;
		this._viewModel = new SBWViewModel();
	}

	public getViewModel(): SBWViewModel {
		return this._viewModel;
	}

	public checkInput(inputToCheck: boolean): void {
		if (this._presentationLogic.checkInput(inputToCheck)) {
			this._viewModel.setColor(inputToCheck);
		}
	}
}
