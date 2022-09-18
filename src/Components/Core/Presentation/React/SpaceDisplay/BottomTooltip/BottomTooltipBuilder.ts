import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import BottomTooltipPresenter from "./BottomTooltipPresenter";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import IUIPort from "../../../../Ports/UIPort/IUIPort";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import IBottomTooltipPresenter from "./IBottomTooltipPresenter";

@injectable()
export default class BottomTooltipBuilder extends PresentationBuilder<
  BottomTooltipViewModel,
  undefined,
  undefined,
  IBottomTooltipPresenter
> {
  constructor() {
    super(BottomTooltipViewModel, undefined, undefined, BottomTooltipPresenter);
  }

  override buildViewModel(): void {
    super.buildViewModel();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerViewModelOnly(this.viewModel, BottomTooltipViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IUIPort>(
      PORT_TYPES.IUIPort
    ).registerBottomTooltipPresenter(this.presenter!);
  }
}
