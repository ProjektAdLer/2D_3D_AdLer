import DoorViewModel from "./DoorViewModel";
import IDoorController from "./IDoorController";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import bind from "bind-decorator";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IExitModalPresenter from "~ReactComponents/LearningSpaceDisplay/ExitModal/IExitModalPresenter";
import IGetLearningSpacePrecursorAndSuccessorUseCase from "src/Components/Core/Application/UseCases/GetLearningSpacePrecursorAndSuccessor/IGetLearningSpacePrecursorAndSuccessorUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import i18next from "i18next";
import { DoorTypes } from "src/Components/Core/Domain/Types/DoorTypes";

export default class DoorController implements IDoorController {
  private bottomTooltipPresenter: IBottomTooltipPresenter;
  private exitModalPresenter: IExitModalPresenter;
  private proximityToolTipId: number = -1;
  private hoverToolTipId: number = -1;

  constructor(private viewModel: DoorViewModel) {
    this.bottomTooltipPresenter = CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    );
    this.exitModalPresenter = CoreDIContainer.get<IExitModalPresenter>(
      PRESENTATION_TYPES.IExitModalPresenter,
    );

    this.viewModel.isInteractable.subscribe(this.onAvatarInteractableChange);
  }

  @bind
  pointerOver(): void {
    if (this.proximityToolTipId === -1 && this.hoverToolTipId === -1)
      this.hoverToolTipId = this.displayTooltip();
  }

  @bind
  pointerOut(): void {
    if (this.hoverToolTipId !== -1) {
      this.bottomTooltipPresenter.hide(this.hoverToolTipId);
      this.hoverToolTipId = -1;
    }
  }

  @bind
  picked(): void {
    if (
      this.viewModel.isInteractable.Value &&
      this.viewModel.isInputEnabled.Value
    ) {
      CoreDIContainer.get<IGetLearningSpacePrecursorAndSuccessorUseCase>(
        USECASE_TYPES.IGetLearningSpacePrecursorAndSuccessorUseCase,
      ).execute();
      this.exitModalPresenter.open(this.viewModel.isExit);
    }
  }

  @bind
  private onAvatarInteractableChange(isInteractable: boolean): void {
    if (isInteractable && this.proximityToolTipId === -1) {
      this.proximityToolTipId = this.displayTooltip();
    } else if (!isInteractable && this.proximityToolTipId !== -1) {
      this.bottomTooltipPresenter.hide(this.proximityToolTipId);
      this.proximityToolTipId = -1;
    }
  }

  private displayTooltip(): number {
    return this.bottomTooltipPresenter.display(
      this.viewModel.isExit
        ? i18next.t("exitDoor", { ns: "learningSpace" })
        : i18next.t("enterDoor", { ns: "learningSpace" }),
      this.viewModel.isExit ? DoorTypes.exitDoor : DoorTypes.entryDoor,
      undefined,
      this.picked,
    );
  }
}
