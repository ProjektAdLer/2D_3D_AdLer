import DoorViewModel from "./DoorViewModel";
import IDoorController from "./IDoorController";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
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
    this.bottomTooltipPresenter.displayDoorTooltip(this.viewModel.isExit);
  }

  @bind
  pointerOut(): void {
    this.bottomTooltipPresenter.hide();
  }

  @bind
  picked(): void {
    CoreDIContainer.get<IGetLearningSpacePrecursorAndSuccessorUseCase>(
      USECASE_TYPES.IGetLearningSpacePrecursorAndSuccessorUseCase
    ).execute();
    this.exitModalPresenter.open(this.viewModel.isExit);
  }

  @bind
  doublePicked(): void {
    this.bottomTooltipPresenter.displayDoorTooltip(this.viewModel.isExit);
  }
}
