import DoorViewModel from "./DoorViewModel";
import IDoorController from "./IDoorController";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IUIPort from "../../../Ports/UIPort/IUIPort";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import { ActionEvent } from "@babylonjs/core/Actions/actionEvent";
import bind from "bind-decorator";

export default class DoorController implements IDoorController {
  constructor(private viewModel: DoorViewModel) {}

  @bind
  pointerOver(): void {
    this.displayTooltip();
  }

  @bind
  pointerOut(): void {
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).hideBottomTooltip();
  }

  @bind
  clicked(event?: ActionEvent | undefined): void {
    const pointerType = (event?.sourceEvent as PointerEvent).pointerType;
    if (pointerType === "mouse") {
      this.openExitModal();
    } else if (pointerType === "touch") {
      this.displayTooltip();
    }
  }

  private displayTooltip(): void {
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).displayExitQueryTooltip();
  }
  private openExitModal(): void {
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).openExitModal();
  }
}
