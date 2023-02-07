import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import BottomTooltipPresenter from "./BottomTooltipPresenter";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import IUIPort from "../../../../Ports/UIPort/IUIPort";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import IBottomTooltipPresenter from "./IBottomTooltipPresenter";
import IBottomTooltipController from "./IBottomTooltipController";
import BottomTooltipController from "./BottomTooltipController";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

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
    // CoreDIContainer.get<IUIPort>(
    //   PORT_TYPES.IUIPort
    // ).registerBottomTooltipPresenter(this.presenter!);

    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).toConstantValue(this.presenter!);
  }
}
