import { injectable } from "inversify";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";
import DoorPresenter from "./DoorPresenter";
import DoorView from "./DoorView";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";

@injectable()
export default class DoorBuilder extends PresentationBuilder<
  DoorViewModel,
  undefined,
  DoorView,
  IDoorPresenter
> {
  constructor() {
    super(DoorViewModel, undefined, DoorView, DoorPresenter);
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, DoorViewModel);
  }
}
