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
import IBottomTooltipController from "./IBottomTooltipController";
import BottomTooltipController from "./BottomTooltipController";

@injectable()
export default class BottomTooltipBuilder extends PresentationBuilder<
  BottomTooltipViewModel,
  IBottomTooltipController,
  undefined,
  IBottomTooltipPresenter
> {
  constructor() {
    super(
      BottomTooltipViewModel,
      BottomTooltipController,
      undefined,
      BottomTooltipPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IUIPort>(
      PORT_TYPES.IUIPort
    ).registerBottomTooltipPresenter(this.presenter!);
  }
}
