import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import DoorController from "./DoorController";
import DoorPresenter from "./DoorPresenter";
import DoorView from "./DoorView";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class DoorBuilder extends PresentationBuilder<
  DoorViewModel,
  DoorController,
  DoorView,
  IDoorPresenter
> {
  constructor() {
    super(DoorViewModel, DoorController, DoorView, DoorPresenter);
  }
  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
