import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LoadRoomButtonController from "./LoadRoomButtonController";
import LoadRoomButtonPresenter from "./LoadRoomButtonPresenter";
import LoadRoomButtonViewModel from "./LoadRoomButtonViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";

@injectable()
export default class LoadRoomButtonBuilder extends PresentationBuilder<
  LoadRoomButtonViewModel,
  LoadRoomButtonController,
  undefined,
  LoadRoomButtonPresenter
> {
  constructor() {
    super(
      LoadRoomButtonViewModel,
      LoadRoomButtonController,
      undefined,
      LoadRoomButtonPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, LoadRoomButtonViewModel);
  }
}
