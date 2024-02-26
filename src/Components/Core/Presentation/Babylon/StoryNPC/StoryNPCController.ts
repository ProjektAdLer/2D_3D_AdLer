import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IStoryNPCController from "./IStoryNPCController";
import StoryNPCViewModel, { StoryNPCState } from "./StoryNPCViewModel";
import bind from "bind-decorator";
import IStoryElementPresenter from "~ReactComponents/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import { Vector3 } from "@babylonjs/core";
import i18next from "i18next";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

export default class StoryNPCController implements IStoryNPCController {
  private logger: ILoggerPort;
  private bottomTooltipPresenter: IBottomTooltipPresenter;
  private proximityToolTipId: number = -1;
  private hoverToolTipId: number = -1;

  constructor(private viewModel: StoryNPCViewModel) {
    this.viewModel.storyElementPresenter =
      CoreDIContainer.get<IStoryElementPresenter>(
        PRESENTATION_TYPES.IStoryElementPresenter
      );
    this.bottomTooltipPresenter = CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    );
    this.logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
  }

  @bind
  pointerOver(): void {
    if (this.proximityToolTipId === -1 && this.hoverToolTipId === -1) {
      this.hoverToolTipId = this.displayTooltip();
      this.scaleUpIcon();
    }
  }

  @bind
  pointerOut(): void {
    if (this.hoverToolTipId !== -1) {
      this.resetIconScale();
      this.bottomTooltipPresenter.hide(this.hoverToolTipId);
      this.hoverToolTipId = -1;
    }
  }

  @bind
  picked(): void {
    if (
      this.viewModel.isInteractable.Value &&
      this.viewModel.state.Value !== StoryNPCState.CutScene
    ) {
      this.bottomTooltipPresenter.hideAll();
      this.viewModel.storyElementPresenter.open(this.viewModel.storyType);
    } else
      this.logger.log(
        LogLevelTypes.TRACE,
        "[StoryNPCController.picked]: StoryNPC is not interactable or in cutscene state (state: " +
          this.viewModel.state.Value +
          "isInteractable: " +
          this.viewModel.isInteractable.Value +
          ")"
      );
  }

  private displayTooltip(): number {
    let tooltipText: string;
    if (this.viewModel.storyType === StoryElementType.Intro)
      tooltipText = i18next.t("introNPC", { ns: "learningSpace" });
    else if (this.viewModel.storyType === StoryElementType.Outro)
      tooltipText = i18next.t("outroNPC", { ns: "learningSpace" });
    else tooltipText = i18next.t("introOutroNPC", { ns: "learningSpace" });

    return this.bottomTooltipPresenter.display(
      tooltipText,
      undefined,
      undefined,
      this.picked
    );
  }

  private scaleUpIcon(): void {
    this.viewModel.iconMeshes?.forEach((mesh) => {
      mesh.scaling = new Vector3(
        mesh.scaling._x * this.viewModel.iconScaleUpOnHover,
        mesh.scaling._y * this.viewModel.iconScaleUpOnHover,
        mesh.scaling._z * this.viewModel.iconScaleUpOnHover
      );
    });
  }

  private resetIconScale(): void {
    this.viewModel.iconMeshes?.forEach((mesh) => {
      mesh.scaling = Vector3.One();
    });
    this.viewModel.iconMeshes[0].rotation = new Vector3(0, -Math.PI / 4, 0);
  }
}
