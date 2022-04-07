import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import ILearningElementPanelPresenter from "./ILearningElementPanelPresenter";
import LearningElementPanelViewModel from "./LearningElementPanelViewModel";

@injectable()
export default class LearningElementPanelPresenter
  implements ILearningElementPanelPresenter
{
  private viewModel: LearningElementPanelViewModel;

  public constructor(
    @inject(LearningElementPanelViewModel)
    viewModel: LearningElementPanelViewModel
  ) {
    this.viewModel = viewModel;
  }

  clicked(): void {
    this.viewModel.text.setValue("clicked");
  }

  public getViewModel(): LearningElementPanelViewModel {
    return this.viewModel;
  }
}
