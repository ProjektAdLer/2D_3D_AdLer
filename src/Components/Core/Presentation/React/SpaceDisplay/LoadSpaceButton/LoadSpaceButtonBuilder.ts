import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LoadSpaceButtonController from "./LoadSpaceButtonController";
import LoadSpaceButtonPresenter from "./LoadSpaceButtonPresenter";
import LoadSpaceButtonViewModel from "./LoadSpaceButtonViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";

@injectable()
export default class LoadSpaceButtonBuilder extends PresentationBuilder<
  LoadSpaceButtonViewModel,
  LoadSpaceButtonController,
  undefined,
  LoadSpaceButtonPresenter
> {
  constructor() {
    super(
      LoadSpaceButtonViewModel,
      LoadSpaceButtonController,
      undefined,
      LoadSpaceButtonPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, LoadSpaceButtonViewModel);
  }
}
