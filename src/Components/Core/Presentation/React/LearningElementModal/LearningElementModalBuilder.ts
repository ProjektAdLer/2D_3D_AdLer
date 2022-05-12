import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import ViewModelProvider from "../../ViewModelProvider/ViewModelProvider";
import LearningElementModalController from "./LearningElementModalController";
import LearningElementModalPresenter from "./LearningElementModalPresenter";
import LearningElementModalViewModel from "./LearningElementModalViewModel";

@injectable()
export default class LearningElementModalBuilder extends PresentationBuilder<
  LearningElementModalViewModel,
  LearningElementModalController,
  null,
  LearningElementModalPresenter
> {
  constructor();
  constructor() {
    super(
      LearningElementModalViewModel,
      LearningElementModalController,
      null,
      LearningElementModalPresenter
    );
  }

  override buildViewModel(): void {
    super.buildViewModel();
    CoreDIContainer.get<ViewModelProvider>(
      CORE_TYPES.IViewModelProvider
    ).registerViewModelOnly(this.viewModel, LearningElementModalViewModel);
  }
}
