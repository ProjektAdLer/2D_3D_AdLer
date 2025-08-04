import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IStoryNPCController from "./IStoryNPCController";
import StoryNPCViewModel, { StoryNPCState } from "./StoryNPCViewModel";
import bind from "bind-decorator";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import { Vector3 } from "@babylonjs/core";
import i18next from "i18next";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LearningElementTypes } from "src/Components/Core/Domain/Types/LearningElementTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IGetUserLocationUseCase from "src/Components/Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import IDoorPresenter from "../Door/IDoorPresenter";

export default class StoryNPCController implements IStoryNPCController {
  private logger: ILoggerPort;
  private bottomTooltipPresenter: IBottomTooltipPresenter;
  private getUserLocationUseCase: IGetUserLocationUseCase;
  private proximityToolTipId: number = -1;
  private hoverToolTipId: number = -1;

  constructor(private viewModel: StoryNPCViewModel) {
    this.bottomTooltipPresenter = CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    );
    this.logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
    this.getUserLocationUseCase = CoreDIContainer.get<IGetUserLocationUseCase>(
      USECASE_TYPES.IGetUserLocationUseCase,
    );

    this.viewModel.isInteractable.subscribe(this.onAvatarInteractableChange);
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
      this.onPicked();
    } else {
      this.logger.log(
        LogLevelTypes.TRACE,
        `StoryNPCController: NPC not interactable (state: ${this.viewModel.state.Value}, interactable: ${this.viewModel.isInteractable.Value})`,
      );
    }
  }

  @bind
  accessibilityPicked(): void {
    this.onPicked();
  }

  @bind
  private onPicked(): void {
    if (this.viewModel.state.Value !== StoryNPCState.Idle) {
      this.viewModel.state.Value = StoryNPCState.Stop;
    }
    this.bottomTooltipPresenter.hideAll();
    this.viewModel.storyElementPresenter.open(this.viewModel.storyType);
  }

  @bind
  private onAvatarInteractableChange(isInteractable: boolean): void {
    if (isInteractable && this.proximityToolTipId === -1) {
      this.proximityToolTipId = this.displayTooltip();
    } else if (!isInteractable && this.proximityToolTipId !== -1) {
      this.bottomTooltipPresenter.hide(this.proximityToolTipId);
      this.proximityToolTipId = -1;
    }
    if (isInteractable && this.viewModel.isSpecialFocused) {
      this.picked();
    }
  }

  private displayTooltip(): number {
    const tooltipText = i18next.t(
      (() => {
        switch (this.viewModel.storyType) {
          case StoryElementType.Intro:
            return "introNPC";
          case StoryElementType.Outro:
            return "outroNPC";
          case StoryElementType.IntroOutro:
          case StoryElementType.None:
          default:
            return "introOutroNPC";
        }
      })(),
      { ns: "learningSpace" },
    );

    return this.bottomTooltipPresenter.display(
      this.viewModel.storyNpcName
        ? tooltipText + ": " + this.viewModel.storyNpcName
        : tooltipText,
      LearningElementTypes.notAnElement, // Provide a valid iconType
      undefined, // data object (optional)
      () => this.picked(), // onClickCallback (optional)
    );
  }

  private scaleUpIcon(): void {
    this.viewModel.iconMeshes?.forEach((mesh) => {
      mesh.scaling = new Vector3(
        mesh.scaling._x * this.viewModel.iconScaleUpOnHover,
        mesh.scaling._y * this.viewModel.iconScaleUpOnHover,
        mesh.scaling._z * this.viewModel.iconScaleUpOnHover,
      );
    });
  }

  private resetIconScale(): void {
    this.viewModel.iconMeshes?.forEach((mesh) => {
      mesh.scaling = Vector3.One();
    });
    this.viewModel.iconMeshes[0].rotation = new Vector3(0, -Math.PI / 4, 0);
  }

  @bind
  async handleNPCExit(storyType: StoryElementType): Promise<void> {
    const userLocation = this.getUserLocationUseCase.execute();

    if (!userLocation.spaceID) {
      this.logger.log(
        LogLevelTypes.WARN,
        "StoryNPCController: User is not in a space!",
      );
      return;
    }

    const exitDoorPresenter = CoreDIContainer.getAll<IDoorPresenter>(
      PRESENTATION_TYPES.IDoorPresenter,
    ).find(
      (door) => door.isExit() && door.belongsToSpace(userLocation.spaceID!),
    );

    if (!exitDoorPresenter) {
      this.logger.log(
        LogLevelTypes.WARN,
        `StoryNPCController: No exit door found for space ${userLocation.spaceID}`,
      );
      return;
    }

    this.logger.log(
      LogLevelTypes.INFO,
      `StoryNPCController: Opening exit door for story type ${StoryElementType[storyType]} in space ${userLocation.spaceID}`,
    );

    return new Promise<void>((resolve) => {
      exitDoorPresenter.open(() => {
        setTimeout(() => {
          exitDoorPresenter.close();
          resolve();
        }, 100);
      });
    });
  }
}
