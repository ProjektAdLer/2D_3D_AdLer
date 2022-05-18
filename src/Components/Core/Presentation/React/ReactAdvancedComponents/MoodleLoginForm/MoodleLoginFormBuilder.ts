import { injectable } from "inversify";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import MoodleLoginFormController from "./MoodleLoginFormController";
import MoodleLoginFormPresenter from "./MoodleLoginFormPresenter";
import MoodleLoginFormViewModel from "./MoodleLoginFormViewModel";

@injectable()
export default class MoodleLoginFormPresenterBuilder extends PresentationBuilder<
  MoodleLoginFormViewModel,
  MoodleLoginFormController,
  undefined,
  MoodleLoginFormPresenter
> {
  constructor();
  constructor() {
    super(
      MoodleLoginFormViewModel,
      MoodleLoginFormController,
      undefined,
      MoodleLoginFormPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, MoodleLoginFormViewModel);
  }
}
