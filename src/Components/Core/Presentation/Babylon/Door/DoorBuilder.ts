import { injectable } from "inversify";
import DoorController from "./DoorController";
import DoorPresenter from "./DoorPresenter";
import DoorView from "./DoorView";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { Vector3 } from "@babylonjs/core";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import IDoorBuilder from "./IDoorBuilder";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";
import { LocationScope } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IAvatarFocusSelection from "../Avatar/AvatarFocusSelection/IAvatarFokusSelection";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

@injectable()
export default class DoorBuilder
  extends AsyncPresentationBuilder<
    DoorViewModel,
    DoorController,
    DoorView,
    IDoorPresenter
  >
  implements IDoorBuilder
{
  position: Vector3;
  rotation: number;
  theme: ThemeType;
  isExit: boolean;
  spaceID: ComponentID;
  isOpen: boolean;

  constructor() {
    super(DoorViewModel, DoorController, DoorView, DoorPresenter);
  }
  override buildViewModel(): void {
    if (
      this.position === undefined ||
      this.rotation === undefined ||
      this.theme === undefined ||
      this.isExit === undefined ||
      this.spaceID === undefined ||
      this.isOpen === undefined
    )
      throw new Error("DoorBuilder: one or more properties are undefined.");

    super.buildViewModel();

    this.viewModel!.position = this.position;
    this.viewModel!.rotation = this.rotation;
    this.viewModel!.theme = this.theme;
    this.viewModel!.isExit = this.isExit;
    this.viewModel!.spaceID = this.spaceID;
    this.viewModel!.isOpen.Value = this.isOpen;
  }

  override buildView(): void {
    super.buildView();

    this.view!.asyncSetup().then(
      () => {
        this.resolveIsCompleted();
      },
      (error) => {
        console.error(error);
      },
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.bind<IDoorPresenter>(
      PRESENTATION_TYPES.IDoorPresenter,
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, LocationScope._sceneRendering);
    CoreDIContainer.get<IAvatarFocusSelection>(
      PRESENTATION_TYPES.IAvatarFocusSelection,
    ).registerFocusable(this.presenter!);
  }
}
