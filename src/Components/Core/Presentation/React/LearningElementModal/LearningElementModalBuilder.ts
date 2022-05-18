import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";
import LearningElementModalController from "./LearningElementModalController";
import LearningElementModalPresenter from "./LearningElementModalPresenter";
import LearningElementModalViewModel from "./LearningElementModalViewModel";

@injectable()
export default class LearningElementModalBuilder extends PresentationBuilder<
  LearningElementModalViewModel,
  LearningElementModalController,
  undefined,
  LearningElementModalPresenter
> {
  constructor();
  constructor() {
    super(
      LearningElementModalViewModel,
      LearningElementModalController,
      undefined,
      LearningElementModalPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(
      this.viewModel,
      this.controller,
      LearningElementModalViewModel
    );
  }
}
