import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import IViewModelControllerProvider from "../../ViewModelProvider/IViewModelControllerProvider";
import ScorePanelPresenter from "./ScorePanelPresenter";
import ScorePanelViewModel from "./ScorePanelViewModel";

@injectable()
export default class ScorePanelBuilder extends PresentationBuilder<
  ScorePanelViewModel,
  undefined,
  undefined,
  ScorePanelPresenter
> {
  constructor() {
    super(ScorePanelViewModel, undefined, undefined, ScorePanelPresenter);
  }

  override buildViewModel(): void {
    super.buildViewModel();
    CoreDIContainer.get<IViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerViewModelOnly(this.viewModel, ScorePanelViewModel);
  }
}
