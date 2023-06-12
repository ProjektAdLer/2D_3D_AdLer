import DoorViewModel from "./DoorViewModel";
import IDoorController from "./IDoorController";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import { ActionEvent } from "@babylonjs/core/Actions/actionEvent";
import bind from "bind-decorator";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IExitModalPresenter from "~ReactComponents/LearningSpaceDisplay/ExitModal/IExitModalPresenter";
import IGetLearningSpacePrecursorAndSuccessorUseCase from "src/Components/Core/Application/UseCases/GetLearningSpacePrecursorAndSuccessor/IGetLearningSpacePrecursorAndSuccessorUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class DoorController implements IDoorController {
  private bottomTooltipPresenter: IBottomTooltipPresenter;
  private exitModalPresenter: IExitModalPresenter;

  constructor(private viewModel: DoorViewModel) {
    this.bottomTooltipPresenter = CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    );
    this.exitModalPresenter = CoreDIContainer.get<IExitModalPresenter>(
      PRESENTATION_TYPES.IExitModalPresenter
    );
  }

  @bind
  pointerOver(): void {
    this.bottomTooltipPresenter.displayDoorTooltip(this.viewModel.isExit.Value);
  }

  @bind
  pointerOut(): void {
    this.bottomTooltipPresenter.hide();
  }

  @bind
  clicked(event?: ActionEvent | undefined): void {
    const pointerType = (event?.sourceEvent as PointerEvent).pointerType;

    if (pointerType === "mouse") {
      CoreDIContainer.get<IGetLearningSpacePrecursorAndSuccessorUseCase>(
        USECASE_TYPES.IGetLearningSpacePrecursorAndSuccessorUseCase
      ).execute();
      this.exitModalPresenter.open(this.viewModel.isExit.Value);
    } else if (pointerType === "touch") {
      this.bottomTooltipPresenter.displayDoorTooltip(
        this.viewModel.isExit.Value
      );
    }
  }
}
