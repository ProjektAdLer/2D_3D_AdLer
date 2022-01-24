import { inject, injectable } from 'inversify';
import { PresentationLogic } from '../API/PresentationLogic';
import { IPresentationLogic } from './../API/IPresentationLogic';
import { SBWViewModel } from './SBWViewModel';

@injectable()
export class SBWPresenter {
	private presentationLogic: IPresentationLogic;
	private viewModel: SBWViewModel;

	constructor(
		@inject(PresentationLogic) presentationLogic: PresentationLogic,
		@inject(SBWViewModel) viewModel: SBWViewModel
	) {
		this.presentationLogic = presentationLogic;
		this.viewModel = viewModel;
	}

	public getViewModel(): SBWViewModel {
		return this.viewModel;
	}

	public checkInput(inputToCheck: boolean): void {
		if (this.presentationLogic.checkInput(inputToCheck)) {
			this.viewModel.setColor(inputToCheck);
		}
	}
}
