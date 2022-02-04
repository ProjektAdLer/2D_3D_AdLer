import { inject, injectable } from 'inversify';
import { PresentationLogic } from '../API/PresentationLogic';
import { IPresentationLogic } from '../API/IPresentationLogic';
import { SBWViewModel } from './SBWViewModel';
import { ISBWView } from './ISBWView';
import TYPES from '../../DependencyInjection/types';

@injectable()
export class SBWPresenter {
	private presentationLogic: IPresentationLogic;
	private viewModel: SBWViewModel;
	private view: ISBWView;

	constructor(
		@inject(PresentationLogic) presentationLogic: PresentationLogic,
		@inject(TYPES.ISBWView) view: ISBWView,
		@inject(SBWViewModel) viewModel: SBWViewModel
	) {
		this.presentationLogic = presentationLogic;
		this.viewModel = viewModel;
		this.view = view;

		this.view.addOnPickTriggerObserver(this.checkInput);
	}

	private checkInput = (): void => {
		if (this.presentationLogic.checkInput(true)) {
			this.viewModel.setState(true);
		}
	};
}
