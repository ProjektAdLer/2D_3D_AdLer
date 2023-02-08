import DoorViewModel from "./DoorViewModel";
import IDoorController from "./IDoorController";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IUIPort from "../../../Ports/UIPort/IUIPort";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import { ActionEvent } from "@babylonjs/core/Actions/actionEvent";
import bind from "bind-decorator";
import IBottomTooltipPresenter from "~ReactComponents/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

export default class DoorController implements IDoorController {
  constructor(private viewModel: DoorViewModel) {}

  @bind
  pointerOver(): void {
    this.displayTooltip();
  }

  @bind
  pointerOut(): void {
    CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).hide();
  }

  @bind
  clicked(event?: ActionEvent | undefined): void {
    const pointerType = (event?.sourceEvent as PointerEvent).pointerType;
    if (pointerType === "mouse") {
      CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).openExitModal();
    } else if (pointerType === "touch") {
      this.displayTooltip();
    }
  }

  private displayTooltip(): void {
    CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).displayExitQueryTooltip();
  }
}
